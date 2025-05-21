
const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1487412912498-0f4faf508847?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Brand founder"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Founded in 2020, Revive & Glow was born from a passion for skincare that truly works. Our founder, Emma Lawson, struggled with sensitive skin for years and was frustrated by products that promised results but delivered irritation.
            </p>
            <p className="text-muted-foreground">
              After years of research and collaboration with leading dermatologists, Emma created a line of skincare products focused on gentle yet effective ingredients that respect your skin's natural balance.
            </p>
            <p className="text-muted-foreground">
              Today, our mission remains the same: to create luxury skincare products that deliver visible results, restore confidence, and promote wellbeing – all while respecting our planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
