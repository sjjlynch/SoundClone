FlickrClone.Views.PhotosIndex = Backbone.CompositeView.extend({
  template: JST["photos/index"],

  events: {
    // 'click .delete': 'destroyPhoto',
    'click button.modal-btn': 'photoModal'
  },

  photoModal: function(){
    var photo = new FlickrClone.Models.Photo();
    var photos = new FlickrClone.Collections.Photos();
    var galleries = new FlickrClone.Collections.Galleries();
    galleries.fetch();
    galleries.fetch();
    this.modalView = this.modalView ||
    new FlickrClone.Views.PhotoFormModal({
      model: photo,
      collection: photos,
      galleries: galleries
    });
    $('body').prepend(this.modalView.render().$el);
    this.modalView.delegateEvents();
  },

  // destroyPhoto: function(event){
  //   var $target = $(event.currentTarget);
  //   var photo = this.collection.getOrFetch($target.attr("data-id"));
  //   photo.destroy();
  // },

  initialize: function(){
    // this.listenTo(this.collection, "add", this.addPhotoItem);
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(this.collection, "sync add remove update", this.render);
  },

  // addPhotoItem: function (photo) {
  //   var view = new FlickrClone.Views.PhotoItem({
  //     model: photo
  //   })
  //   this.addSubview("#myphotos", view);
  //   this.render();
  // },

  render: function(){
    var content = this.template({
      photos: this.collection
      });
    this.$el.html(content);
    // this.attachSubviews();
    setTimeout(function(){
      this.$("#myphotos").justifiedGallery({
        "rowHeight": 80,
        "captions": true,
        "waitThumbnailsLoad": true,
        "captionSettings":	{ animationDuration: 500,
          visibleOpacity: 0.7,
          nonVisibleOpacity: 0.0 }
        });
      }.bind(this), 10);
    return this;
  }

});
