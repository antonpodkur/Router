interface ImageOverlayCardProps {
  imageUrl: string;
  text: string;
}

const ImageOverlayCard: React.FC<ImageOverlayCardProps> = ({
  imageUrl,
  text,
}) => {
  return (
    /*<!-- Component: Image overlay card --> */
    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
      {/*  <!-- Image --> */}
      <figure className="relative">
        <img
          src={imageUrl}
          alt="card image"
          className="aspect-video w-full object-cover"
        />
        <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-8 text-white">
          <h3 className="text-lg md:text-4xl font-semibold ">{text}</h3>
        </figcaption>
      </figure>
    </div>
    /*<!-- End Image overlay card --> */
  );
};

export default ImageOverlayCard;
