
class CristinView {
  constructor() {
    this.view = new View();
    this.listTemplate = Hiof.Templates['cristin/list'];
    this.defaults = {
      // These are the defaults.
      url: '//hiof.no/api/v1/cristin/',
      username: 'haraldh'
    };
    this.options = this.setupOptions();
  }


  render(options = {}){
    let settings = Object.assign(
      {},
      this.defaults,
      this.options
    )
    //console.log(settings);
    //Connect this context to the View class as that
    let that = this;
    // getData() Ajax for content, function takes the object options with all the settings.
    // See the class constructor for mor information regarding the options.
    this.view.getData(settings, that).success(function(data){
      //console.log(data);
      //console.log(that);
      let templateSource = that.listTemplate;
      let markup = templateSource(data);
      //console.log(markup);
      $('.cristin-load').append(markup);
      $('.cristin-publications').footable({
        breakpoints: {
          phone: 640,
          tablet: 899,
          desktop: 900
        }
      });

    });
  }


  setupOptions(el){

    let thisLoader;
    if (typeof el === 'undefined') {
      thisLoader = $('.cristin-load');
    } else {
      thisLoader = $(el);
    }


    let thisUsername = null;
    if (thisLoader.attr('data-username')) {
      thisUsername = thisLoader.attr('data-username');
    }
    //console.log(thisDestination);

    options = {
      username: thisUsername
    };

    return options;
  }


}
