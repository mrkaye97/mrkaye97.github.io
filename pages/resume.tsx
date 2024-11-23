export default function Resume() {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="p-4 bg-blue-600 rounded-lg shadow-lg text-center">
          <h3 className="text-xl mb-2 text-light-seafoam">Job Title 1</h3>
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div className="p-4 bg-blue-600 rounded-lg shadow-lg text-center">
          <h3 className="text-xl mb-2 text-light-seafoam">Job Title 2</h3>
          <p className="text-white">
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
            commodo diam libero vitae erat.
          </p>
        </div>
        <div className="p-4 bg-blue-600 rounded-lg shadow-lg text-center">
          <h3 className="text-xl mb-2 text-light-seafoam">Job Title 3</h3>
          <p className="text-white">
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc
            ut sem vitae risus tristique posuere.
          </p>
        </div>
      </div>
    </div>
  );
}
