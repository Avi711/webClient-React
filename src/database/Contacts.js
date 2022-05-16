
const imageMessage1 = <img src="image1.jpg" style={{width: '100%', marginBottom: '0.3rem'}}></img>
const videoMessage1 = <video src="video1.mp4" style={{width: '100%', marginBottom: '0.3rem'}} controls></video>
const audioMessage1 = <audio src="audio1.mp3" preload="auto" controls></audio>

let avi77kehat77 = [{sender: true, message: "hello", time: 1650554845894}, {sender:false, message: "hello to", time: 1650554845894}, {sender:false, message: imageMessage1, time: 1650554845894}, {sender:true, message: "wow very nice", time: 1650554845994}]
let avi77or77 = [{sender:true, message: "Hey or", time: 1650554845894}, {sender:true, message: "send me song", time: 1650554845894}, {sender: false, message: videoMessage1, time: 1650554845894}, {sender: false, message: "Hope you like it :)", time: 1650554845894}]
let avi77rodin77 = [{sender:false, message: "hello", time: 1650554845894}, {sender:false, message: "send me song please", time: 1650554845894}, {sender:true, message: "try this", time: 1650554845894}, {sender:true, message: audioMessage1, time: 1650554845894}]


let dan77kehat77 = [{sender:true, message: "hello", time: 1650554845894}, {sender:false, message: "hello to", time: 1650554845894}]
let dan77or77 = [{sender:true, message: "hello to you tu", time: 1650554845894}, {sender:true, message: "hello not", time: 1650554845894}]
let dan77rodin77 = [{sender:true, message: "hello", time: 1650554845894}, {sender:true, message: "hello", time: 1650554845894}]

const Contacts = [
    {
      username: "avi77",
      userContacts: [{ contactName: 'kehat77', displayname:'kehat', lastMessage: 'hello', time: 1650554845894, image : "profile3.png", chat:  avi77kehat77},
  { contactName: 'or77', displayname:'or', lastMessage: 'whats up ?', time: 1650554845894, image : "profile6.png", chat:  avi77or77 },
  { contactName: 'rodin77', displayname:'rodin', lastMessage: 'hi bro', time: 1650554845894 , image : "profile5.png", chat:  avi77rodin77 }]
    },
    {
      username: "dan77",
      userContacts: [{ contactName: 'sudri', displayname:'sudri', lastMessage: 'hello there', time: '15:12', image : "profile3.png", chat:  dan77kehat77 },
      { contactName: 'shirin', displayname:'shirin', lastMessage: 'whats up ?', time: 1650554845894, image : "profile5.png", chat:  dan77kehat77 },
      ]
    },
    {
      username: "kehat77",
      userContacts: []
    },
    {
      username: "or77",
      userContacts: []
    },
    {
      username: "rodin77",
      userContacts: []
    },
    {
      username: "shirin77",
      userContacts: []
    },
  ]

export default Contacts;