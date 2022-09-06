import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin.from("images").select("*").order("id");

  return {
    props: {
      images: data,
    },
  };
}

export default function Gallery({ images }) {
  return (
    <>
      {images.map((image) => (
        <BlurImage key={image.id} image={image} />
      ))}
    </>
  );
}

function BlurImage({ image }) {
  return (
    <a href={image.href}>
      <div>
        <Image alt="" src={image.imageSrc} width={320} height={240} />
      </div>
      <h3>{image.name}</h3>
      <p>{image.username}</p>
    </a>
  );
}
