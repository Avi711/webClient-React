
let avi711Kehat = [{sender:"avi711", message: "hello", time: "11:47"}, {sender:"kehat", message: "hello to", time: "11:47"}]
let avi711Or = [{sender:"avi711", message: "hello", time: "11:47"}, {sender:"avi711", message: "hello not", time: "11:47"}]
let avi711Rodin = [{sender:"avi711", message: "hello", time: "11:47"}, {sender:"avi711", message: "hello", time: "11:47"}]

const Contacts = [
    {
      username: "avi711",
      userContacts: [{ contactName: 'kehat', contactMessage: 'hello', time: '12:12', image : "profile3.png", chat:  avi711Kehat},
  { contactName: 'or', contactMessage: 'whats up ?', time: '13:09', image : "profile6.png", chat:  avi711Or },
  { contactName: 'rodin', contactMessage: 'hi bro', time: '14:12' , image : "profile5.png", chat:  avi711Rodin }]
    },
    {
      username: "dan711",
      userContacts: [{ contactName: 'sudri', contactMessage: 'hello there', time: '15:12', image : "profile3.png" },
      { contactName: 'shirin', contactMessage: 'whats up ?', time: '13:09', image : "profile5.png" },
      { contactName: 'tal', contactMessage: 'hi bro ehat ap', time: '14:12', image : "profile6.png" }]

    }
  ]

export default Contacts;