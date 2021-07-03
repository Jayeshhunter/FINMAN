// var updatePostStats = {
//   Done: function (postId) {
//     document.querySelector("#" + postId).textContent = "Done";
//   },
//   Cancel: function (postId) {
//     document.querySelector("#" + postId).textContent = "Cancel";
//   },
// };
function cancel(event) {
  var postUn = event.target.dataset.postUname;
  var postNa = event.target.dataset.postName;
  console.log(postUn);
  var postSt = "Cancelled";

  //   updatePostStats["Cancel"](postNa);
  // document.querySelector("#" + postNa).textContent = "Cancelled";
  axios.post("/invoice/" + postUn + "/" + postNa + "/" + postSt, {
    status: postSt,
    name: postNa,
    username: postUn,
  });
}
function done(event) {
  var postUn = event.target.dataset.postUname;
  var postNa = event.target.dataset.postName;
  var postSt = "Done";

  axios.post("/invoice/" + postUn + "/" + postNa + "/" + postSt, {
    status: postSt,
    name: postNa,
    username: postUn,
  });
}
function change(event) {
  var postNa = event.target.dataset.postName;
  document.querySelector("#" + postNa).textContent = "Cancelled";
}
