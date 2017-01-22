<template>
<div class="container">

    <div v-if="photo != null" style="width:400px;display:inline-block" >
        <img id="image" :src="'images/'+ photo.type + '/' + photo.model_id + '/' + photo.filename">
    </div>

    <div v-if="displayCrop" style="width:400px;display:inline-block" >
        <img style="width:100%" :src="getImage()">
    </div>

    <button class="btn btn-primary" @click="storePhoto">Save Photo</button>
    <form action="/photo"
          class="dropzone"
          id="my-awesome-dropzone">
    </form>

</div>
</template>

<style type="text/css">
    img {
        max-width: 100%;
    }
</style>

<script>
    export default {
        data() {
            return {
                image: null,
                fileInput: null,
                image: null,
                croppedImage: null,
                cropper: null,
                displayCrop: false,
                photo: null,
            }
        },

        created() {
            Event.listen('imageCropped', (croppedImage) => {
                this.croppedImage = croppedImage;
                this.displayCrop = true;
            });

            Event.listen('croppingImage', () => {
                this.displayCrop = false;
                this.croppedImage = null;
            });
        },
        mounted() {
            Dropzone.options.myAwesomeDropzone = {
                paramName: "file", // The name that will be used to transfer the file
                maxFilesize: 20, // MB
                headers: { "X-CSRF-TOKEN": Laravel.csrfToken },
                accept: (file, done) => {
                    done();
                },
                success: (file, response) => {
                    this.photo = {
                        filename: response.filename,
                        type: response.type,
                        model_id: response.model_id
                    }
                    setTimeout(() => {
                        this.setCropper();
                    }, 10)
                },
            }
        },

        methods: {
            getImage(){
                return this.croppedImage + '?' + new Date().getTime();
            },
            setCropper() {
                var image = document.querySelector('#image');
                var minAspectRatio = 1.5;
                var maxAspectRatio = 1.5;
                this.cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    ready: function () {
                        var cropper = this.cropper;
                        var containerData = cropper.getContainerData();
                        var cropBoxData = cropper.getCropBoxData();
                        var aspectRatio = cropBoxData.width / cropBoxData.height;
                        var newCropBoxWidth;



                        if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                            newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);
                            cropper.setCropBoxData({
                              // width: newCropBoxWidth
                            });
                        }
                    },

                    cropmove: function () {
                        var cropper = this.cropper;
                        var cropBoxData = cropper.getCropBoxData();
                        var aspectRatio = cropBoxData.width / cropBoxData.height;

                        if (aspectRatio < minAspectRatio) {
                            cropper.setCropBoxData({
                                // width: cropBoxData.height * minAspectRatio,
                                // height: (cropBoxData.width / 1.5 ) * 1
                            });
                        } else if (aspectRatio > maxAspectRatio) {
                            cropper.setCropBoxData({
                              // width: cropBoxData.height * maxAspectRatio,
                              // height: (cropBoxData.width / 1.5 ) * 1
                            });
                        }
                    },
                });
            },


            storePhoto() {
                Event.fire('croppingImage');
                let containerData = this.cropper.getContainerData();
                let cropBoxData = this.cropper.getCropBoxData();

                let imageWidth = containerData.width;
                let imageHeight = containerData.height;

                let cropWidth = cropBoxData.width;
                let cropHeight = cropBoxData.height;

                let cropCoordinateLeft = cropBoxData.left;
                let cropCoordinateTop = cropBoxData.top;

                // calculate percentages
                let yPercentage  = ( Math.round( ( 100 / imageHeight ) * cropCoordinateTop ) / 100);
                let xPercentage = ( Math.round( (100 / imageWidth ) * cropCoordinateLeft ) / 100 );
                let cropHeightPercentage = Math.round( (100 / imageHeight ) * cropHeight ) / 100;
                let cropWidthPercentage = Math.round( ( 100 / imageWidth ) * cropWidth ) / 100;

                axios.get(
                    '/crop?width='+ cropWidthPercentage +
                    '&height=' + cropHeightPercentage +
                    '&x=' + xPercentage +
                    '&y=' + yPercentage +
                    '&photo=' + JSON.stringify(this.photo)
                , {}).then((response) => {
                    setTimeout(() => {
                        console.log(response);
                        Event.fire('imageCropped', response.data.croppedImage);
                    });

                });
            },
        },

    }
</script>
