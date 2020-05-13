// class TodoList {
// 	constructor() {
// 		this._list = []
// 	}
// 	get length() {
// 		return this._list.length
// 	}
// 	add(todo) {
// 		let finished = false
// 		this._list.push({ todo, finished })
// 		return this
// 	}
// 	toggleFinish(index) {
// 		this._list[index].finished = !this._list[index].finished
// 		return this
// 	}
// 	remove(index) {
// 		this._list.splice(i, 1)
// 		return this
// 	}
// 	get(index) {
// 		return this._list[index]
// 	}
// 	show() {
// 		console.table(this._list)
// 	}
// }

;(function () {
  let input = document.querySelector('#input')
  let todoLists = document.querySelector('#todo-list')
  let items = JSON.parse(localStorage.getItem('items')) || []
  let footer = document.querySelector('#footer')
  let toggleAll = document.querySelector('#toggle-all')

  function createList(item = [], container) {
    container.innerHTML = item.map((obj, i) => {
      let context = `<div class='view'>
      <input class='toggle'  data-index=${i} type='checkbox' ${obj.done ? 'checked' : ''}>
      <label class="edit">${obj.text}</label>
      <button class='destroy' data-id=${i}>X</button>
    </div>`
      if (obj.done === true) {
        return `
      <li class='todoLi toggle-delete'>
      ${context}
    </li>
      `
      } else {
        return `
        <li class='todoLi'>
        ${context}
      </li>
        `

      }

    }).join('')
    if (todoLists.firstElementChild !== null) {
      footer.style.display = 'flex'
    }

  }

  function addItem(e) {
    e.preventDefault()
    const text = (this.querySelector('[name=item]')).value
    const item = {
      text,
      done: false
    }
    if (text === '') return
    items.push(item)
    storeData(items)

    this.reset()
    footer.style.display = 'flex'
  }

  function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
  }


  function clickStateHandler(e) {
    if (e.target.className === 'destroy') {
      const index = e.target.dataset.id
      items.splice(index, 1)
     
    }
    let arr = []
    if (e.target.className === 'clear-all') {
      for(let i of items){
        if(i.done === true){
          arr.push(i)
        }
      }
      console.log(arr)
      for(let j = 0;j<arr.length;j++){
        items.splice(arr[j],1)
      }
     
     
    }
    if (e.target.className === 'toggle') {
      const index = e.target.dataset.index 
      items[index].done = !items[index].done
      // console.log(items[index].done)
    }
    
    storeData(items)
    checkState()
  }


  let deleteHandler = (e) => { //add delete-line
    if(e.target.className === 'toggle-all'){
      const check = Array.from(document.querySelectorAll('.toggle'))
      if(toggleAll.checked === true){
        for(let i = 0;i < items.length;i++){
          console.log(items[i])
          items[i].done = true
        }
      }else{
        for(let i = 0;i < items.length;i++){
          console.log(items[i])
          items[i].done = false
        }
      }
     
    }
    storeData(items)
  }

  let editHandler = (e) => { //edit content
    console.log(e.target)
    // if (e.target.className == 'edit') {
    //   let target = e.target
    //   let current = e.target.innerText
    //   target.innerHTML = `<textarea class="newconts" >${current}</textarea>`
    //   let newconts = Array.from(document.querySelectorAll('textarea'))
    //   console.log(newconts)
    //   newconts.forEach(i => {
    //     i.addEventListener('blur', (e) => {
    //       let val = e.target.value
    //       target.innerHTML = val
    //       console.log(e.target.value)
    //     })
    //   })
    // }
  }
  
  function checkState() {
    if (todoLists.firstElementChild === null) {
      footer.style.display = 'none'
    }
  }

  function storeData(data) {

    createList(data, todoLists)
    localStorage.setItem('items', JSON.stringify((items)))
  }
  createList(items, todoLists)
  input.addEventListener('submit', addItem)
  document.addEventListener('click', clickStateHandler)
  document.addEventListener('dblclick', editHandler)
  document.addEventListener('change', deleteHandler)
})()
