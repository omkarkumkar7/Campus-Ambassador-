import { useState } from "react";
import "./Guidelines.css";
import bg from "../assets/guidelines.webp";

const guidelinesData = [
  {
    title: "Introduction",
    content:
      "As a Campus Ambassador you would be working in the below mentioned facets. Every facet has its own point allotted. Your tasks can broadly be divided into Facebook activities and Non-Facebook Activities.",
  },
  {
    title: "Communication",
    content:
      "It is recommended to get connected with the members in the Contact Us page for better communication. There is a feature of messaging included in the Portal. Our team members will contact you using the same feature and you may contact them using this feature too. Any instance of obscenity or indiscipline may lead to removal from the Portal.",
  },
  {
    title: "Reflect",
    content:
      "This includes workshops, publicity drives, helping during prelims, putting up posters and more. Upload a photo to get bonus points. Any violation or defaming Spring Fest will result in a ban.",
  },
  {
    title: "Participants Contacts",
    content:
      "Share contacts of people who could possibly attend the fest. You may enter details manually or upload an excel sheet in the provided format.",
  },
  {
    title: "Professional Contacts",
    content:
      "Send contacts of potential organizations including media houses, sponsors, newspapers, TV and radio channels.",
  },
  {
    title: "Give Us An Idea",
    content:
      "Propose innovative ideas for Spring Fest. Feasible ideas will be executed during the fest.",
  },
  {
    title: "Leaderboard",
    content:
      "Displays your ranking among fellow Campus Ambassadors. Top performers receive incentives.",
  },
  {
    title: "Some General Points To Be Noted",
    content:
      "A minimum score of 100 is required to receive a certificate. Some points are updated instantly while others require verification. Only portal-shared posts award points.",
  },
];

export default function Guidelines() {
  const [openIndex, setOpenIndex] = useState(-1); // nothing open initially

  return (
    <div
      className="guidelines-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="guidelines-overlay" />

      <div className="guidelines-container">
        <h1 className="guidelines-title">GUIDELINES</h1>

        {guidelinesData.map((item, index) => (
          <div key={index} className="guidelines-item">
            <button
              className="guidelines-header"
              onClick={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
            >
              <span>{item.title}</span>
              <span className="symbol">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="guidelines-content">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
