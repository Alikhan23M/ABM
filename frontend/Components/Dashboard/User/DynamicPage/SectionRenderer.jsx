import React from 'react';

const SectionRenderer = ({ section, globalColors }) => {
  if (!section || !section.type) return null;

  const headingColor = section.layout?.textColor || globalColors.text.headingColor;
  const paragraphColor = globalColors.text.paragraphColor;

  const getCardStyle = (stylePath) => {
    const cardDefaults = globalColors.cards[0] || {};
    const keys = stylePath.split('.');
    let val = cardDefaults;
    for (const k of keys) {
      if (val == null) return null;
      val = val[k];
    }
    return val;
  };

  const renderContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="relative overflow-hidden">
            {section.image && <img src={section.image} alt={section.title} className="w-full h-96 object-cover" />}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-4xl font-bold text-center">{section.title}</h2>
              <p className="text-xl text-center mt-2">{section.description}</p>
              {section.buttonText && (
                <a href={section.buttonLink} className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full font-bold text-black">{section.buttonText}</a>
              )}
              {section.html && <div className="mt-4" dangerouslySetInnerHTML={{ __html: section.html }} />}
            </div>
          </div>
        );
      case 'card-grid':
        return (
          <div className={`grid gap-6 grid-cols-1 md:grid-cols-${section.layout?.columns || 3}`}>
            {section.items.map(item => (
              <div 
                key={item._id} 
                className="p-6 rounded-lg shadow-md border" 
                style={{ backgroundColor: getCardStyle('bgColor'), borderColor: getCardStyle('borderColor') }}
              >
                {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />}
                <h3 className="text-xl font-bold mb-2" style={{ color: getCardStyle('headingColor') }}>{item.title}</h3>
                <p style={{ color: getCardStyle('descriptionColor') }}>{item.description}</p>
                {item.buttonText && (
                  <a href={item.buttonLink} 
                     className="inline-block mt-4 px-4 py-2 rounded" 
                     style={{ backgroundColor: getCardStyle('button.bgColor'), color: getCardStyle('button.textColor') }}>
                    {item.buttonText}
                  </a>
                )}
              </div>
            ))}
          </div>
        );
      case 'gallery':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.items.map(item => (
              <img key={item._id} src={item.image} alt="gallery" className="w-full h-48 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-6">
            {section.items.map(item => (
              <div key={item._id} className="p-6 bg-white rounded-lg shadow-md border">
                <p className="italic text-gray-700 mb-4">"{item.description}"</p>
                <div className="flex items-center">
                  {item.image && <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full object-cover mr-4" />}
                  <div>
                    <p className="font-semibold text-lg">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-4">
            {section.items.map(item => (
              <div key={item._id} className="border-b pb-4">
                <h4 className="font-semibold text-lg" style={{ color: headingColor }}>{item.question}</h4>
                <p className="mt-1" style={{ color: paragraphColor }}>{item.answer}</p>
              </div>
            ))}
          </div>
        );
      case 'custom-html':
        return <div dangerouslySetInnerHTML={{ __html: section.html }} />;
      case 'simple':
      default:
        const simpleLayout = section.layout?.imagePlacement === 'left' ? 'flex-row' : section.layout?.imagePlacement === 'right' ? 'flex-row-reverse' : 'flex-col';
        return (
          <div className={`flex ${simpleLayout} items-center gap-6`}>
            {section.image && (
              <img src={section.image} alt={section.title} className={`object-cover rounded-lg shadow-md ${section.layout?.imagePlacement !== 'top' ? 'w-full md:w-1/2' : 'w-full'} h-64`} />
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2" style={{ color: headingColor }}>{section.title}</h3>
              <p className="mb-4" style={{ color: paragraphColor }}>{section.description}</p>
              {section.buttonText && (
                <a href={section.buttonLink} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md">{section.buttonText}</a>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <section 
      id={section.url} 
      className="mb-12 py-8 px-4 rounded-lg" 
      style={{ backgroundColor: section.layout?.backgroundColor || 'transparent' }}
    >
      <h2 style={{ color: headingColor }} className="text-3xl font-bold text-center mb-6">{section.title}</h2>
      {renderContent()}
    </section>
  );
};

export default SectionRenderer;