"use strict";
var KTAppEcommerceSaveCategory = (function () {
    const e = () => {
            $("#kt_ecommerce_add_category_conditions").repeater({
                initEmpty: !1,
                defaultValues: { "text-input": "foo" },
                show: function () {
                    $(this).slideDown(), t();
                },
                hide: function (e) {
                    $(this).slideUp(e);
                },
            });
        },
        t = () => {
            document
                .querySelectorAll(
                    '[data-kt-ecommerce-catalog-add-category="condition_type"]'
                )
                .forEach((e) => {
                    $(e).hasClass("select2-hidden-accessible") ||
                        $(e).select2({ minimumResultsForSearch: -1 });
                });
            document
                .querySelectorAll(
                    '[data-kt-ecommerce-catalog-add-category="condition_equals"]'
                )
                .forEach((e) => {
                    $(e).hasClass("select2-hidden-accessible") ||
                        $(e).select2({ minimumResultsForSearch: -1 });
                });
        };
    return {
        init: function () {
            [
                "#kt_ecommerce_add_category_description",
            ].forEach((e) => {
                let t = document.querySelector(e);
                t &&
                    (t = new Quill(e, {
                        modules: {
                            toolbar: [
                                [{ header: [1, 2, !1] }],
                                ["bold", "italic", "underline"],
                                ["image", "code-block"],
                            ],
                        },
                        placeholder: "Type your text here...",
                        theme: "snow",
                    }));
            }),
                // ["#kt_ecommerce_add_category_meta_keywords"].forEach((e) => {
                //     const t = document.querySelector(e);
                //     t && new Tagify(t);
                // }),
                e(),
                t(),
                (() => {
                    const e = document.getElementById(
                            "kt_ecommerce_add_category_status"
                        ),
                        t = document.getElementById(
                            "kt_ecommerce_add_category_status_select"
                        ),
                        o = ["bg-success", "bg-warning", "bg-danger"];
                    $(t).on("change", function (t) {
                        switch (t.target.value) {
                            case "published":
                                e.classList.remove(...o),
                                    e.classList.add("bg-success"),
                                    r();
                                break;
                            case "scheduled":
                                e.classList.remove(...o),
                                    e.classList.add("bg-warning"),
                                    c();
                                break;
                            case "unpublished":
                                e.classList.remove(...o),
                                    e.classList.add("bg-danger"),
                                    r();
                        }
                    });
                    const a = document.getElementById(
                        "kt_ecommerce_add_category_status_datepicker"
                    );
                    $("#kt_ecommerce_add_category_status_datepicker").flatpickr(
                        { enableTime: !0, dateFormat: "Y-m-d H:i" }
                    );
                    const c = () => {
                            a.parentNode.classList.remove("d-none");
                        },
                        r = () => {
                            a.parentNode.classList.add("d-none");
                        };
                })(),
                (() => {
                    const e = document.querySelectorAll(
                            '[name="method"][type="radio"]'
                        ),
                        t = document.querySelector(
                            '[data-kt-ecommerce-catalog-add-category="auto-options"]'
                        );
                    e.forEach((e) => {
                        e.addEventListener("change", (e) => {
                            "1" === e.target.value
                                ? t.classList.remove("d-none")
                                : t.classList.add("d-none");
                        });
                    });
                })(),
                (() => {
                    let e;
                    const t = document.getElementById(
                            "kt_ecommerce_add_category_form"
                        ),
                        o = document.getElementById(
                            "kt_ecommerce_add_category_submit"
                        );
                    (e = FormValidation.formValidation(t, {
                        fields: {
                            category_name: {
                                validators: {
                                    notEmpty: {
                                        message: "Category name is required",
                                    },
                                },
                            },
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: "",
                            }),
                        },
                    })),
                        o.addEventListener("click", (a) => {
                            a.preventDefault(),
                                e &&
                                    e.validate().then(function (e) {
                                        console.log("validated!"),
                                            "Valid" == e
                                                ? (o.setAttribute(
                                                      "data-kt-indicator",
                                                      "on"
                                                  ),
                                                  (o.disabled = !0),
                                                  setTimeout(function () {
                                                      o.removeAttribute(
                                                          "data-kt-indicator"
                                                      ),
                                                          Swal.fire({
                                                              text: "Form has been successfully submitted!",
                                                              icon: "success",
                                                              buttonsStyling:
                                                                  !1,
                                                              confirmButtonText:
                                                                  "Ok, got it!",
                                                              customClass: {
                                                                  confirmButton:
                                                                      "btn btn-primary",
                                                              },
                                                          }).then(function (e) {
                                                              //   e.isConfirmed &&
                                                              //       ((o.disabled =
                                                              //           !1),
                                                              //       (window.location =
                                                              //           t.getAttribute(
                                                              //               "data-kt-redirect"
                                                              //           )));
                                                              //   var hvalue = $(".ql-editor").html();
                                                              //   console.log(
                                                              //       hvalue
                                                              //   );
                                                              $(
                                                                  "#description"
                                                              ).append(
                                                                  "<textarea name='description' style='display:none'>" +
                                                                      $(
                                                                          ".ql-editor"
                                                                      ).html() +
                                                                      "</textarea>"
                                                              );
                                                              $(
                                                                  "#kt_ecommerce_add_category_form"
                                                              ).submit();
                                                          });
                                                  }, 2e3))
                                                : Swal.fire({
                                                      text: "Sorry, looks like there are some errors detected, please try again.",
                                                      icon: "error",
                                                      buttonsStyling: !1,
                                                      confirmButtonText:
                                                          "Ok, got it!",
                                                      customClass: {
                                                          confirmButton:
                                                              "btn btn-primary",
                                                      },
                                                  });
                                    });
                        });
                })();
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTAppEcommerceSaveCategory.init();
});
