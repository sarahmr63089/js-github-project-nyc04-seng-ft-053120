let githubForm = document.querySelector("#github-form")
let userList = document.querySelector("#user-list")
let repoList = document.querySelector("#repos-list")
let userArray = []
let repoArray = []

githubForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let userName = evt.target.search.value

  fetch(`https://api.github.com/search/users?q=${userName}`)
  .then(res => res.json())
  .then(userObj => {
    userArray = userObj.items
    renderUser()
  })
  evt.target.reset()
})

let turnUserIntoHTML = (user) => {
  let userLi = document.createElement("li")

  let userNameH2 = document.createElement("h2")
  userNameH2.innerText = user.login
  
  let userImg = document.createElement("img")
  userImg.src = user.avatar_url

  let userLink = document.createElement("a")
  userLink.href = user.html_url
  userLink.innerText = "Click here to view this profile"

  userLi.append(userNameH2, userImg, userLink)
  userList.append(userLi)

  userNameH2.addEventListener("click", (evt) => {

    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(res => res.json())
    .then(repoObj => {
      console.log(repoObj)
      repoArray = repoObj
      renderRepo()
    })
  })
}

let renderUser = () => {
  userArray.forEach((user) => {
    turnUserIntoHTML(user)
  })
}

let turnRepoIntoHTML = (repo) => {
  let repoLi = document.createElement("li")
  
  let repoName = document.createElement("a")
  repoName.href = repo.html_url
  repoName.innerText = repo.name

  repoLi.append(repoName)
  repoList.append(repoLi)
}

let renderRepo = () => {
  repoList.innerHTML = ""
  repoArray.forEach((repo) => {
    turnRepoIntoHTML(repo)
  })
}