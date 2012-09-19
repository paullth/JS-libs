
(function(){

    jQuery.event.props.push('dataTransfer');

    if(!Backbone){
        throw 'Please include Backbone.js before Backbone.FileBinder.js';
    }

    Backbone.FileBinder = function(){};
    Backbone.FileBinder.VERSION = '0.0.1';
    Backbone.FileBinder.Constants = {};
    Backbone.FileBinder.Constants.ModelToView = 'ModelToView';
    Backbone.FileBinder.Constants.ViewToModel = 'ViewToModel';

    _.extend(Backbone.FileBinder.prototype, {

        bind:function (model, rootEl, param) {
            // console.log('filebinder: bind');
            this.unbind(model);

            this._param = (param === undefined) ? '' : param ;
            this._model = model;
            this._rootEl = rootEl;
            if (!this._model) throw 'model must be specified';
            if (!this._rootEl) throw 'rootEl must be specified';

            this._initializeElBindings();
        },
        unbind:function (model) {
            if(this._model){
                this._model.off('upload');
                this._model = undefined;
            }
            if(this._rootEl){
                this._rootEl = undefined;
            }
            if(this._elementBinding){
                if(this._elementBinding.boundEls){
                    $(this._elementBinding.boundEls).each(function(i, element){
                        $(element).off('change', this._onChange);
                    });
                }
                delete this._elementBinding;
                this._elementBinding = undefined;
            }
            if(this._param){
                this._param = undefined;
            }
            if(this._fileInputData){
                delete this._fileInputData;
                this._fileInputData = undefined;
            }
        },
        _initializeElBindings:function () {
            // console.log('filebinder: _initializeElBindings');

            var that = this, elementBinding = {}, foundEls, elCount, el;
            
            foundEls = $(':file', this._rootEl);
            if(foundEls.length > 1){
                throw 'too many file inputs'
            }
            if (foundEls.length > 0) {
                elementBinding.boundEls = [];
                for (elCount = 0; elCount < foundEls.length; elCount++) {
                    el = foundEls[elCount];
                    elementBinding.boundEls.push(el);
                }
                this._bindViewToModel();
            }
            this._elementBinding = elementBinding;
            foundEls.each(function(i, element){
                $(element).on('change', {filebinder: that}, that._onChange);
            });
        },

        _bindViewToModel:function () {
            var that = this;
            // console.log('filebinder: _bindViewToModel');
            this._model.on('upload', function(event){
                that._upload(event);
            });
        },

        _upload:function (event) {
            // console.log('filebinder: _upload');
            var that = this;
            if(this._elementBinding && this._elementBinding.boundEls){
                el = $(this._elementBinding.boundEls[0]);
                if(!!(window.XMLHttpRequestUpload && window.FileReader)){
                    var formData = new FormData();
                    
                    formData.append("file", el[0].files[0]);
                    var xhr = new XMLHttpRequest();
                    xhr.open("PUT", this._model.url());
                    xhr.send(formData);
                } else {
                    var options = {
                        type : 'POST',
                        dataType : "iframe",
                        url : this._model.url() + that._param,
                        fileInput : this._fileInputData.fileInput
                    };
                    $.ajax(options);
                }
            }
        },
        _onChange: function(event){
            // console.log('filebinder: _onChange');
            var that = event.data.filebinder, data = {
                files: $.each($.makeArray(event.target.files), function (index, file) {
                    if (file.name === undefined && file.size === undefined) {
                        file.name = file.fileName;
                        file.size = file.fileSize;
                    }
                }),
                fileInput: $(event.target),
                form: $(event.target.form)
            };
            if (!data.files.length) {
                // If the files property is not available, the browser does not
                // support the File API
                data.files = [{name: event.target.value.replace(/^.*\\/, '')}];
            }
            var inputClone = data.fileInput.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            data.fileInput.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(data.fileInput.unbind('remove'));
            // console.log('FileBinder', '_onChange', data);
            that._fileInputData = data;
        }
    });


}).call(this);