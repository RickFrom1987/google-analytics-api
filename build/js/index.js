(function() {
  const GALLERY_ITEM = {
    url: 'https://cloud-elements.com/wp-content/uploads/2014/02/salesforcev2.png',
    text: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  }
  const GALLERY_ITEMS = Array(10).fill(GALLERY_ITEM)
  
  const modal = new Modal()
  const gallery = new Gallery('gallery-2017', {
    items: GALLERY_ITEMS,
    onClickFn: (item) => {
      modal.render(item)
    }
  })
})()