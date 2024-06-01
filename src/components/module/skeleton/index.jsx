export const Skeleton = () => {
  return (
    <>
      <style jsx>
        {`
          .card {
            width: 320px;
            background-color: #fff;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
          }
          .image {
            height: 200px;
          }
          .description {
            font-size: 1rem;
            line-height: 1.4rem;
          }
          .loading .image,
          .loading h4,
          .loading .description {
            background-color: #ededed;
            background: linear-gradient(
                100deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 60%
              )
              #ededed;
            background-size: 200% 100%;
            background-position-x: 180%;
            animation: 1s loading ease-in-out infinite;
          }

          @keyframes loading {
            to {
              background-position-x: -20%;
            }
          }

          .loading h4 {
            min-height: 1.6rem;
            border-radius: 4px;
            animation-delay: 0.05s;
          }

          .loading .description {
            min-height: 4rem;
            border-radius: 4px;
            animation-delay: 0.06s;
          }
        `}
      </style>
      <div className="card loading">
        <div className="image"></div>
        <div className="content">
          <h4></h4>
          <div className="description"></div>
        </div>
      </div>
    </>
  );
};
