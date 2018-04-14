class Modal {
  constructor(id, data) {
    this.data = data
    const modal = document.createElement('div')
    modal.id = 'gallery-modal'
    modal.style.display = 'none'
    document.body.appendChild(modal)
    modal.innerHTML = `
      ${this.renderCloseButton()}
      <div id="gallery-modal-content">
      </div>
    `
    this.modal = modal
    this.attachListeners()
  }

  attachListeners() {
    const close = document.getElementById('gallery-modal-close')
    close.onclick = () => {
      this.hide()
    }
  }

  renderCloseButton() {
    return `
      <div id="gallery-modal-close">x</div>
    `
  }

  renderImage(src) {
    return `
      <img src="${src}"/>
    `
  }

  renderText(text){
    return `
      <div>${text}</div>
    `
  }

  show(html) {
    this.modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }

  hide() {
    this.modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }

  // main render loop
  render(data) {
    if (!data || !data.url || !data.text) {
      throw new Error('No Modal Data')
    }
    const modalContent = document.getElementById('gallery-modal-content')
    modalContent.innerHTML = `
      ${this.renderImage(data.url)}
      ${this.renderText(data.text)}
    `
    this.show()
  }
}