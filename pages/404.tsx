import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center text-white mt-0 sm:mt-24">
      <div className="w-full p-8 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-6xl mb-16 font-bold text-light-seafoam">404</h1>
          <h3 className="text-2xl">
            These are not the HTML nodes you are looking for
          </h3>
          <h4 className="text-2xl">
            <Link href="/" className="text-light-seafoam">
              Back to home, go.
            </Link>{" "}
            And find your page, you will.
          </h4>
        </div>
      </div>
    </div>
  );
}
