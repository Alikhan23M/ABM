// Page.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import { FaArrowRight } from "react-icons/fa";
import NotFoundPage from "../../../NotFoundPage/NotFoundPage";

export default function Page({ pageData }) {
    const { url } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (pageData) {
            setPage(pageData);
            setLoading(false);
            return;
        }

        const fetchPage = async () => {
            try {
                setLoading(true);
                const res = await AxiosRequest.get(`/api/pages/${url}`);
                setPage(res.data.page);
            } catch (err) {
                setError("Error loading page");
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [url, pageData]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <NotFoundPage/>;
    if (!page) return null;

    const colors = page.colors || {};

    const renderButton = (text, link, category = 'button') => {
        if (!text || !link) return null;

        const buttonStyles = {
            backgroundColor: colors[category]?.bgColor,
            color: colors[category]?.textColor,
            transition: 'background-color 0.3s ease'
        };
        const hoverColor = colors[category]?.hoverBgColor;

        return (
            <a href={link} 
               className="inline-flex items-center px-6 py-3 rounded-lg font-semibold mt-4 group"
               style={buttonStyles}
               onMouseEnter={e => e.currentTarget.style.backgroundColor = hoverColor}
               onMouseLeave={e => e.currentTarget.style.backgroundColor = colors[category]?.bgColor}>
                {text} <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
        );
    };

    const renderContent = () => {
        const headingStyle = { color: colors.text?.headingColor };
        const paraStyle = { color: colors.text?.paragraphColor };
        const contentBgStyle = { backgroundColor: colors.background?.contentBgColor };
        
        const cardBgColor = colors.card?.bgColor;
        const cardBorderColor = colors.card?.borderColor;
        const cardHeadingColor = colors.card?.headingColor;
        const cardParaColor = colors.card?.descriptionColor;
        
        switch (page.template) {
            case 'simple-page':
                const textAlignment = page.contentPosition === 'center' ? 'text-center' : 'text-left';
                const maxWidthClass = page.contentPosition === 'center' ? 'max-w-2xl mx-auto' : 'max-w-full';
                
                return (
                    <div className={`p-12 rounded-lg shadow-lg ${textAlignment}`} style={contentBgStyle}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={headingStyle}>{page.mainTitle}</h1>
                        <p className={`text-lg ${maxWidthClass}`} style={paraStyle}>{page.mainDescription}</p>
                        {renderButton(page.buttonText, page.buttonLink)}
                    </div>
                );
            case 'simple-page-with-image':
                const isLeftOrRight = page.imagePlacement === 'left' || page.imagePlacement === 'right';
                const containerClass = isLeftOrRight ? "md:grid md:grid-cols-2 md:gap-8 items-center" : "";
                const imageContainerClass = page.imagePlacement === 'right' ? "md:col-start-2 md:row-start-1" : "";
                const textContainerClass = page.imagePlacement === 'right' ? "md:col-start-1 md:row-start-1" : "";
                const textAlignmentClass = page.imagePlacement === 'top' ? 'text-center' : 'text-left';
                
                return (
                    <div className={`p-8 rounded-lg shadow-lg ${containerClass}`} style={contentBgStyle}>
                        {page.mainImage && (
                            <div className={`mb-6 md:mb-0 ${imageContainerClass}`}>
                                <img src={page.mainImage} alt={page.mainTitle} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                        )}
                        <div className={`${textAlignmentClass} ${textContainerClass}`}>
                            <h1 className="text-4xl font-bold mb-4" style={headingStyle}>{page.mainTitle}</h1>
                            <p className="text-lg" style={paraStyle}>{page.mainDescription}</p>
                            {renderButton(page.buttonText, page.buttonLink)}
                        </div>
                    </div>
                );
            case 'card-grid-page':
                return (
                    <div className="p-8 rounded-lg shadow-lg" style={contentBgStyle}>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={headingStyle}>{page.mainTitle}</h1>
                            <p className="text-lg max-w-3xl mx-auto" style={paraStyle}>{page.mainDescription}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {page.cards.map((card, index) => (
                                <div key={index} 
                                     className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                     style={{ backgroundColor: cardBgColor, border: `1px solid ${cardBorderColor}` }}>
                                    {card.image && (
                                        <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                    )}
                                    <h2 className="text-2xl font-semibold mb-2" style={{ color: cardHeadingColor }}>{card.title}</h2>
                                    <p className="mb-4" style={{ color: cardParaColor }}>{card.description}</p>
                                    {renderButton(card.buttonText, card.buttonLink, 'card')}
                                </div>
                            ))}
                        </div>
                        {renderButton(page.buttonText, page.buttonLink)}
                    </div>
                );
            default:
                return <div className="text-center p-12 text-red-500">Invalid page template.</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: colors.background?.pageBgColor }}>
            <div className="w-full max-w-7xl mx-auto">
                {renderContent()}
            </div>
        </div>
    );
}