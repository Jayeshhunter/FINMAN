function cancel(event) {
  var postUn = event.target.dataset.postUname;
  var postNa = event.target.dataset.postName;
  var postSt = "Cancelled";
  //   updatePostStats["Cancel"](postNa);
  axios.post("/bill/" + postUn + "/" + postNa + "/" + postSt, {
    status: postSt,
    name: postNa,
    username: postUn,
  });
}
function done(event) {
  var postUn = event.target.dataset.postUname;
  var postNa = event.target.dataset.postName;
  var postSt = "Done";
  //   updatePostStats["Done"](postNa);
  axios.post("/bill/" + postUn + "/" + postNa + "/" + postSt, {
    status: postSt,
    name: postNa,
    username: postUn,
  });
}
