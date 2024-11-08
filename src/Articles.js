import { useState } from "react";

export function Articles(params) {
  let articles = params.data.articles ? params.data.articles : [];
  let queryName = params.query.queryName ? params.query.queryName : "na";
  let articleCount = params.data.totalResults ? params.data.totalResults : 0;

  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleClick = (article) => {
    setSelectedArticle(article === selectedArticle ? null : article);
  };

  const titleStyle = {
    textDecoration: "underline",
    color: "blue",
    marginRight: "10px", // Small amount of separation
  };

  const infoStyle = {
    textDecoration: "underline",
    color: "green",
    cursor: "pointer",
  };

  const textStyle = {
    color: "blue",

     // Set the text color to blue
 
  };

  const textvis = {
    fontWeight: "bold",
    color: "red",
     // Set the text color to blue
 
  };

  return (
    <div>
   
      <div> <span style= {textvis}>
        Query: </span><span style={textStyle}>{queryName}</span>
      </div>
      <div>
      <span style= {textvis}>
        Count:
        </span> <span style={textStyle}>{articleCount}</span>
      </div>

      <ol>
        {articles.map((item, idx) => {
          if (item) {
            if (item.title) {
              if (item.title === "[Removed]") {
                return <li key={idx}>Was Removed</li>;
              }
              let trimTitle = item.title.substring(0, 30);
              return (
                <li key={idx} className="add-detail">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={titleStyle}
                  >
                    {trimTitle}
                  </a>
                  <span onClick={() => handleClick(item)} style={infoStyle}>
                    Info
                  </span>
                  {selectedArticle === item && (
                    <div className="add-border">
                      <h3>Additional Details:</h3>
                      <p>Author: <span className="add-color">{item.author}</span></p>
                      <p>Description: <span className="add-color">{item.description}</span></p>
                      <p>Published: <span className="add-color">{item.publishedAt}</span></p>
                      
                      <a
                        href={item.urlToImage}
                        target="_blank"
                        rel="noreferrer"
                      ><span className="add-detail">Picture</span>
                      </a>
                      
                    </div>
                    
                  )}
                  <br />
                </li>
              );
            } else {
              return <li key={idx}>No Title</li>;
            }
          } else {
            return <li key={1}>No Item</li>;
          }
        })}
      </ol>
    </div>
  );
}