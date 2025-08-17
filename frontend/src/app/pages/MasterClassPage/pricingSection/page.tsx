export default function PricingSection() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Tuition fees start from <span className="text-red-600">81k/h</span>
        </h2>
        <p className="mb-6">Book your free consultation</p>
        {/* Fake form */}
        <div className="bg-gray-50 p-6 rounded shadow inline-block text-left w-full md:w-auto">
          <form>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Your phone"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Your email"
              />
            </div>
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};