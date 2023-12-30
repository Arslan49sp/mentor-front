const AddClassModel = () => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => console.log("closing the model")}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
              iste magni hic nobis, accusamus illo quo excepturi? Voluptatibus,
              atque magnam. Tenetur, aut sunt laboriosam non voluptates repellat
              totam, in magnam eos, aliquid similique at? Aperiam dolores saepe
              et facilis! Corrupti quasi quibusdam quam pariatur in. Vel
              architecto sint atque laudantium nam eos itaque quam, vero
              provident incidunt deserunt non modi sed fugit obcaecati nostrum.
              Sequi commodi voluptas fugiat eaque velit.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClassModel;
