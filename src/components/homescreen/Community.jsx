import React from "react";
import "./GroupCard.css"; // CSS for styling

const Community = () => {
  const groups = [
    { name: "BADVERSE|Group 1", link: "https://chat.whatsapp.com/FD8DKlm7Ft46ux0MT5WE5j" },
    { name: "BADVERSE|Group 2", link: "https://chat.whatsapp.com/JxYNLOBMxLLBpVjpH3tfe3" },
    { name: "BADVERSE|Group 3", link: "https://chat.whatsapp.com/FliXhmZbPtQ9bPWZrYiNFV" },
    { name: "BADVERSE|Group 4", link: "https://chat.whatsapp.com/EE94qTVY4Ef5T6zUTfwNcM" },
    { name: "BADVERSE|Group 5", link: "https://chat.whatsapp.com/E7mCifrVlMv6djLdghQ90F" },
    { name: "BADVERSE|Group 6", link: "https://chat.whatsapp.com/BwpGvqEOSnF3cPiwTgcWam" },
    { name: "BADVERSE|Group 7", link: "https://chat.whatsapp.com/FVHMHLRwW1yHUwWE8q7cPp" },
    { name: "BADVERSE|Group 8", link: "https://chat.whatsapp.com/L0h1WeWYVfrFcoJkb6FZQQ" },
    { name: "BADVERSE|Group 9", link: "https://chat.whatsapp.com/DWWDyUSjs2ZE9h1FpD2dED" },
    { name: "BADVERSE|Group 10", link: "https://chat.whatsapp.com/DWFYlH32rMCAJVbpmV6Gii" },
  ];

  return (
    <div className="group-cards-page">
      <h1 className="heading">
        JOIN BADVERSE<span className="highlight"> COMMUNITY</span>
      </h1>
      <div className="group-cards-container">
        {/* Render the first 8 cards */}
        {groups.map((group, index) => (
          <div className="card" key={index}>
            <img
              src="/community_logo.jpeg"
              alt="Logo"
              className="card-logo"
            />
            <h2 className="card-title">
              {/* Split the name into two lines */}
              {group.name.replace("|", "").split(/(?<=BADVERSE)/).map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <a
              href={group.link}
              className="card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Group
            </a>
          </div>
        ))}

        {/* Render the last row with 2 cards, centered */}
      </div>
    </div>
  );
};

export default Community;
