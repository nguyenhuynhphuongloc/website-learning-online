export default function ValuedPartners() {
  return (
    <section className="bg-blue-50 py-16 px-4 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our Valued Partners
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <img
          src="/assets/partner-bc.png"
          alt="British Council"
          className="w-24 h-auto"
        />
        <img
          src="/assets/partner-ielts.png"
          alt="IELTS"
          className="w-24 h-auto"
        />
        <img
          src="/assets/partner-idp.png"
          alt="IDP"
          className="w-24 h-auto"
        />
        <img
          src="/assets/partner-cambridge.png"
          alt="Cambridge"
          className="w-24 h-auto"
        />
        <img
          src="/assets/partner-collab.png"
          alt="Collaboration"
          className="w-24 h-auto"
        />
      </div>
    </section>
  );
};