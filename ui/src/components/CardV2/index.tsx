import { useMemo } from "react";
import "./index.css";
import { getLogoUrl } from "../../utils/check";
import { getJumpTarget } from "../../utils/setting";
import { Helmet } from "react-helmet";
const Card = ({ title, url, des, logo, catelog, onClick, index, isSearching }) => {
  const el = useMemo(() => {
    if (url === "admin") {
      return <img src={logo} alt={title} />
    } else {
        return <img src={getLogoUrl(logo)} alt={title} />
    }
  }, [logo, title, url])
  const showNumIndex = index < 10 && isSearching;
  // 生成结构化数据
  const generateStructuredData = () => {
    // 只为实际网站链接生成结构化数据，跳过特殊链接
    if (url === "admin" || url === "toggleJumpTarget" || url.startsWith("javascript:")) {
      return null;
    }

    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": title,
      "description": des,
      "applicationCategory": catelog,
      "url": url,
      "image": getLogoUrl(logo),
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CNY"
      }
    };
  };

  const structuredData = generateStructuredData();

  return (
    <>
      {structuredData && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      )}
      <a
        href={url === "toggleJumpTarget" ? undefined : url}
        onClick={() => {
          onClick();
        }}
        target={getJumpTarget() === "blank" ? "_blank" : "_self"}
        rel="noreferrer"
        className="card-box"
        itemScope
        itemType="https://schema.org/SoftwareApplication"
      >
        {showNumIndex && <span className="card-index">{index + 1}</span>}
        <div className="card-content">
          <div className="card-left">
            {el}
          </div>
          <div className="card-right">
            <div className="card-right-top">
              <span className="card-right-title" title={title} itemProp="name">{title}</span>
              <span className="card-tag" title={catelog} itemProp="applicationCategory">{catelog}</span>
            </div>
            <div className="card-right-bottom" title={des} itemProp="description">{des}</div>
            <meta itemProp="url" content={url} />
            <meta itemProp="image" content={getLogoUrl(logo)} />
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="price" content="0" />
              <meta itemProp="priceCurrency" content="CNY" />
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default Card;
