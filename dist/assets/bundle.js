!(function (e) {
  var n = {};
  function t(r) {
    if (n[r]) return n[r].exports;
    var a = (n[r] = { i: r, l: !1, exports: {} });
    return e[r].call(a.exports, a, a.exports, t), (a.l = !0), a.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
    }),
    (t.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (t.t = function (e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (t.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var a in e)
          t.d(
            r,
            a,
            function (n) {
              return e[n];
            }.bind(null, a)
          );
      return r;
    }),
    (t.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(n, "a", n), n;
    }),
    (t.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ""),
    t((t.s = 0));
})([
  function (e, n) {
    var t = db.collection("QuestionsAndAnswers"),
      r = document.querySelector(".add"),
      a = document.querySelector(".btn"),
      c = document.querySelector(".quiz-form"),
      i = document.getElementById("name"),
      o =
        (document.querySelector(".resultWrap"),
        document.getElementById("showQuizForm")),
      l = document.querySelector(".setNewQuiz"),
      u = document.querySelector(".quizBar"),
      s = document.querySelector(".resultWrap span"),
      d = document.querySelector(".deleteLastQ"),
      p = (document.querySelector(".deleteQuiz"), {}),
      v = [];
    function m(e) {
      (s.innerText = e),
        setInterval(function () {
          s.innerText = "";
        }, 2e3);
    }
    function f() {
      document.querySelectorAll(".active").forEach(function (e) {
        e.classList.remove("active");
      });
    }
    function y() {
      document.querySelectorAll(".remove").forEach(function (e) {
        e.remove();
      });
    }
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var n = document.querySelectorAll(".new-question");
      n.forEach(function (e) {
        var n = {
          question: e.question.value,
          answers: [e.A.value, e.B.value, e.C.value],
          rightAnswer: e.rightAnswer.value,
        };
        (n.name = i.value), v.push(n);
      }),
        (p[0] = v),
        t.add(p),
        n.forEach(function (e) {
          e.reset();
        }),
        y(),
        m("quiz successfully added");
    }),
      r.addEventListener("click", function (e) {
        var n = document.createElement("DIV");
        n.classList.add("remove"),
          (n.innerHTML =
            '\n  <form class="new-question my-3">\n      <div class="input-group my-2">\n        <div class="input-group-prepend">\n          <div class="input-group-text">Your question:</div>\n        </div>\n        <input type="text" id="question" class="form-control" required>\n      </div>\n      <div class="input-group mb-3">\n        <div class="input-group-prepend">\n          <div class="input-group-text">Answare A:</div>\n        </div>\n        <input type="text" id="A" class="form-control" required>\n        <div class="input-group-text ml-3">\n          <label>\n            <input type="radio" name="rightAnswer" value="0" checked>\n            <span class="ml-2">This is right answer.</span>\n          </label>\n        </div>\n      </div>\n      <div class="input-group mb-3">\n        <div class="input-group-prepend">\n          <div class="input-group-text">Answare B:</div>\n        </div>\n        <input type="text" id="B" class="form-control" required>\n        <div class="input-group-text ml-3">\n          <label>\n            <input type="radio" name="rightAnswer" value="1">\n            <span class="ml-2">This is right answer.</span>\n          </label>\n        </div>\n      </div>\n      <div class="input-group mb-3">\n        <div class="input-group-prepend">\n          <div class="input-group-text">Answare C:</div>\n        </div>\n        <input type="text" id="C" class="form-control" required>\n        <div class="input-group-text ml-3">\n          <label>\n            <input type="radio" name="rightAnswer" value="2">\n            <span class="ml-2">This is right answer.</span>\n          </label>\n        </div>\n      </div>\n    </form>\n  '),
          document.querySelector(".formWrap form:last-child").append(n);
      }),
      t.onSnapshot(function (e) {
        e.docChanges().forEach(function (e) {
          var n, t, r;
          "added" === e.type &&
            ((n = e.doc.data()),
            (t = e.doc.id),
            (r = '\n  <li class="list-group-item" id="'
              .concat(
                t,
                '"><button class="deleteQuiz btn btn-danger">x</button> '
              )
              .concat(n[0][0].name, "</li>\n  ")),
            (u.innerHTML += r));
        });
      }),
      u.addEventListener("click", function (e) {
        "LI" === e.target.tagName &&
          ((c.innerHTML =
            '<div class="answerWrap">\n    \x3c!-- render questions --\x3e\n  </div>\n  '),
          t
            .doc(e.target.id)
            .get()
            .then(function (e) {
              !(function (e) {
                for (
                  var n = document.querySelector(".answerWrap"),
                    t = e[0],
                    r = 0;
                  r < t.length;
                  r++
                )
                  n.innerHTML += '\n  <div class="my-5">\n  <p class="lead font-weight-normal">'
                    .concat(
                      t[r].question,
                      '</p>\n  <div class="form-check my-2 text-black-50">\n    <label class="form-check-label">\n      <input type="radio" name="q'
                    )
                    .concat(r, '" value="0" checked>\n      ')
                    .concat(
                      t[r].answers[0],
                      '\n    </label>\n  </div>\n  <div class="form-check my-2 text-black-50">\n    <label class="form-check-label">\n      <input type="radio" name="q'
                    )
                    .concat(r, '" value="1">\n      ')
                    .concat(
                      t[r].answers[1],
                      '\n    </label>\n  </div>\n  <div class="form-check my-2 text-black-50">\n    <label class="form-check-label">\n      <input type="radio" name="q'
                    )
                    .concat(r, '" value="2">\n      ')
                    .concat(
                      t[r].answers[2],
                      '\n    </label>\n  </div>\n  <input type="hidden" class="rightAnswer" name="rightAnswer" value='
                    )
                    .concat(t[r].rightAnswer, ">\n  </div>\n    ");
              })(e.data()),
                (c.innerHTML +=
                  '\n      <div class="text-center">\n        <input type="submit" class="btn btn-danger submit">\n      </div>');
            })),
          f(),
          e.target.classList.add("active"),
          c.classList.add("active");
      }),
      c.addEventListener("submit", function (e) {
        e.preventDefault();
        var n = [],
          t = document.querySelectorAll(".rightAnswer");
        t.forEach(function (e) {
          n.push(e.value);
        });
        var r = [];
        document
          .querySelectorAll(".answerWrap input[type='radio']:checked")
          .forEach(function (e) {
            r.push(e.value);
          });
        var a = 0;
        r.forEach(function (e, t) {
          e === n[t] && (a += 1);
        });
        var c = Math.floor((a / t.length) * 100);
        window.scroll({ top: 0, behavior: "smooth" });
        var i = 0,
          o = setInterval(function () {
            (s.textContent = "".concat(i, "%")),
              i === c ? clearInterval(o) : i++;
          }, 15);
      }),
      o.addEventListener("click", function (e) {
        f(), l.classList.add("active"), y();
      }),
      d.addEventListener("click", function (e) {
        var n = document.querySelector(".new-question").lastChild;
        "remove" === n.className && n.remove();
      }),
      u.addEventListener("click", function (e) {
        if ("BUTTON" === e.target.tagName) {
          var n = e.target.parentElement.id;
          db
            .collection("QuestionsAndAnswers")
            .doc(n)
            .delete()
            .then(function () {
              console.log("Document successfully deleted!");
            })
            .catch(function (e) {
              console.error("Error removing document: ", e);
            }),
            e.target.parentElement.remove(),
            f(),
            m("quiz successfully deleted");
        }
      });
  },
]);
