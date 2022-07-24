function Introduction() {
  return (
    <article
      style={{
        lineHeight: "2rem",
      }}
      className="prose mx-auto container"
    >
      <h2> Collaborative pixel painting</h2>
      <p
        style={{
          padding: "0 1.5rem 0 1.5rem",
        }}
      >
        DESOPIXELART is the first ever collectible, collaborative pixel artwork
        to-be-created by the Deso community. Each canvas is 25x25 pixels in size
        and has multiple authors, who create a unique piece of art by
        collaborating together. The completed artwork will be put up for an
        auction and when sold, auction proceeds will be distributed among all
        contributors evenly, depending on how many pixels they contributed to
        the canvas.
      </p>

      <h3>Earn by contributing</h3>
      <p
        style={{
          padding: "0 1.5rem 0 1.5rem",
        }}
      >
        By contributing to the artwork you are not only signing your pixels to
        the system. You are also entitled to a percentage of the proceeds from
        the auction of the final piece as well as a portion of every sale
        afterwards.
      </p>

      <p
        style={{
          padding: "0 1.5rem 0 1.5rem",
        }}
      >
        When the completed canvas is auctioned: 85% of auction proceeds will be
        distributed amongst contributors. Every sale of the canvas afterwards:
        5% of sale proceeds will be distributed amongst contributors.
      </p>

      <ul className="steps steps-vertical lg:steps-horizontal mx-2 p-0">
        <li className="step step-success ">
          <span className="mx-4 mt-6 lg:mx-5 ml-2">
            Paint any pixels you want on any available canvas.
          </span>
        </li>
        <li className="step step-success ">
          <span className="mx-0 mt-6 lg:mx-4 mr-2">
            {" "}
            The more you paint, the bigger share of the painting you get.
          </span>
        </li>
        <li className="step step-success ">
          <span className="mx-0 mt-10 lg:mx-1 mr-12">
            {" "}
            After all pixels are set, the canvas is put up for auction. Anyone
            can make a bid.
          </span>
        </li>
        <li className="step step-success ">
          <span className="mx-0 mt-5 lg:mx-4 mr-8">
            {" "}
            85% of the winning bid from auction is distributed to the painters.
          </span>
        </li>
      </ul>
    </article>
  );
}

export default Introduction;
