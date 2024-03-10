import db from './firebase.mjs';
import { ref, set, get, push, onValue } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'
const section1 = document.querySelector('#section1')
const section2 = document.querySelector('#section2')
const ad = document.querySelector('#ad')
const password = document.querySelector('#password')
const h1 = document.querySelector('h1')

document.querySelector('#btn').addEventListener('click', async function (e) {
    e.preventDefault()
    if (ad.value.trim() == '') {
        alert('ad boshdur')
    }
    if (password.value.trim() == '') {
        alert('pasword boshdur')
        return
    }
    let use = window.localStorage.getItem('user')
    if (!use) {
        section1.style.display = 'flex'
        section2.style.display = 'none'
    } else {
        use = JSON.parse(use)
        let adSon = ad.value
        let paswod = password.value
        if ((await get(ref(db, `user/${use.key}`))).exists() && (adSon == use.username) && (paswod == use.password)) {
            section1.style.display = 'none'
            section2.style.display = 'block'
            h1.innerHTML = `${ad.value} WELCOME`
            ad.value = ''
            password.value = ''

        } else {
            if (adSon == use.username && paswod != use.password) {
                alert('Password səhvdi')
            } else {
                alert('Qeydiyyatdan keç')
            }
            password.value = ''
            section1.style.display = 'flex'
            section2.style.display = 'none'
        }
    }

})

document.querySelector('#back').addEventListener('click', function (e) {
    e.preventDefault()
    ad.innerHTML = ''
    password.innerHTML = ''
    section1.style.display = 'flex'
    section2.style.display = 'none'
    section3.style.display = 'none'
})
const ad2 = document.querySelector('#ad2')
const pasword2 = document.querySelector('#password2')
const section3 = document.querySelector('#section3')
document.querySelector('#sign').addEventListener('click', e => {
    e.preventDefault()
    section1.style.display = 'none'
    section3.style.display = 'flex'
})
document.querySelector('.btnMain1').addEventListener('click', e => {
    const ad = ad2.value
    e.preventDefault()
    if (ad2.value === '') {
        alert("ad daxil edin")
    }
    if (pasword2.value === '') {
        alert('passwod daxil edin')
        return
    }
    const snapshop = push(ref(db, 'user'))
    set(ref(db, `user/${snapshop.key}`), ad).then(() => {
        const user = {
            username: ad,
            password: pasword2.value,
            key: snapshop.key
        }
        localStorage.setItem('user', JSON.stringify(user))
    })

    set(ref(db, `user/${snapshop.key}1`), pasword2.value)
    section1.style.display = 'flex'
    section3.style.display = 'none'

})
const mesaj = document.querySelector('#mesaj')
document.querySelector('#send').addEventListener('click',function (e) {
    e.preventDefault()
    if (mesaj.value !== '') {
        const user = JSON.parse(localStorage.getItem('user'))
        const snapsho = push(ref(db, 'user'))
        set(ref(db, `chat/${snapsho.key}`), {
            text: mesaj.value,
            user
        }).then(() => {
            mesaj.value = ''
        })
    } else {
        alert('BOSH')
    }
})
onValue(ref(db, 'chat'),snap=> {
    console.log('heyca')
    const user = JSON.parse(localStorage.getItem('user'))
    const chat = snap.val()
    const messageDiv = document.querySelector('#chat')
    messageDiv.innerHTML = ''
    for (let i in chat) {
        const message = chat[i]
        const newDiv = document.createElement('div')
        if (user.key == message.user.key) {
            newDiv.classList.add('my-message')
        } else {
            newDiv.classList.add('incoming-message')
        }
        newDiv.classList.add('messageDiv')
        newDiv.innerHTML = `${message.user.username}:${message.text}`
        messageDiv.append(newDiv)
    }
})
