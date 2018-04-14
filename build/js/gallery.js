class Gallery {
  constructor(id, options) {
    this.container = (document.getElementById(id)) ? document.getElementById(id) : null
    this.items = options.items
    this.onClickFn = options.onClickFn
    this.ITEMS_PER_ROW = 4
    // Divides items into rows
    const rows = this.items.map((item, index) => {
      return index % this.ITEMS_PER_ROW === 0 ? this.items.slice(index, index + this.ITEMS_PER_ROW) : null
    }).filter((item) => { return item })

    const rowsHtml = this.renderRows(rows)
    this.container.innerHTML = `
      <div class="gallery-container">
        ${rowsHtml}
      </div>
    `
    this.attachHandlers()
  }

  attachHandlers() {
    Array.from(document.getElementsByClassName('gallery-item')).forEach((element) => {
      element.onclick = (e) => {
        const currTarget = e.currentTarget
        return this.onClickFn({
          url: currTarget.getAttribute('data-url'),
          text: currTarget.getAttribute('data-text')
        })
      }
    });
  }

  // render an individual item
  renderItem(item) {
    // 12 width grid system
    const num = Math.ceil(12 / this.ITEMS_PER_ROW)
    return `
      <div class="col-${num} gallery-item" data-url="${item.url}" data-text="${item.text}">
        <img class="img" src="${item.url}"/>
        <p>${item.text}</p>
      </div>
    `
  }

  // render all rows
  renderRows(rows) {
    return rows.map((r) => {
      return this.renderRow(r)
    }).join('')
  }

  // render a single row
  renderRow(row) {
    const rowHtml = row.map((item) => {
      return this.renderItem(item)
    }).join('')

    return `
      <div class="row">
        ${rowHtml}
      </div>
    `
  }
}