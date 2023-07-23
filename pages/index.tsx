import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import Image from 'next/image';


// ————————————————————————————————————————————————————— Fetch data on the server side
export async function getStaticProps() {
  // ——————————————————————————————————————————————————— Create connection to supabase
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  // ——————————————————————————————————————————————————— Use supabase & store inside data
  // ——————————————————————————————————————————————————— Everything from imagesTable
  const { data } = await supabaseAdmin
    .from('imagesTable')
    .select('*')
    .order('id')
  // ——————————————————————————————————————————————————— getStaticProps return data
  // ——————————————————————————————————————————————————— Inside of the 'images' props
  // ——————————————————————————————————————————————————— To the default export function of our file
  return {
    props: {
      images: data
    }
  }
}

function combineListOfClassname(...classes: string[]) {
  // ——————————————————————————————————————————————————— Helper function already provide
  return classes.filter(Boolean).join(' ')
}

type Image = {
  id: number
  username: string
  href: string
  imgSrc: string
}



export default function Gallery({ images }: { images: Image[] }) {
  // ——————————————————————————————————————————————————— Obtain data from images provide in getStaticProp

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}

      </div>
    </div>
  );
}


function BlurImage({ image }: { image: Image }) {
  // ——————————————————————————————————————————————————— Obtain image from props provide in Gallery

  const [isLoading, setIsLoading] = useState(true)


  return (
    <a href="#" className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">

        <Image
          alt={`placeholder image n°${image.id} for testing Next LazyLoad`}
          src={image.imgSrc}
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setIsLoading(false)}
          className={combineListOfClassname(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
        />

      </div>

      <h3 className="mt-4 text-sm text-gray-700">
        Lee Robinson
      </h3>

      <p className="mt-1 text-lg font-medium text-gray-900">
        @leeerob
      </p>
    </a>
  );
}