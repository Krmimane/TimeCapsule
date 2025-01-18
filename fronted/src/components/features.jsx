import React from "react";
import '../styles/style.css';
export const Features = (props) => {
  const defaultData = [
    {
      title: "Auto-Destructive Mechanism",
      text: "Ensures secure disposal after a set period to protect sensitive contents.",
      icon: "fa fa-shield",
    },
    {
      title: "Long-lasting Preservation",
      text: "Designed to protect contents for decades without degradation.",
      icon: "fa fa-archive",
    },
    {
      title: "Customizable Settings",
      text: "Allows users to configure opening dates, notifications, and access permissions.",
      icon: "fa fa-cogs",
    },
    {
      title: "Compact & Durable Design",
      text: "Built with materials that withstand extreme conditions and environments.",
      icon: "fa fa-cube",
    },
  ];

  return (
    <div id="features" className="text-center" >
      <div className="container">
        <div className="col-md-10 section-title">
          <h2 style={{marginLeft:"210px", paddingTop:"60px"}}>Features</h2>
        </div>
        <div className="row" >
          {(props.data || defaultData).map((d, i) => (
            <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
              {/* Circle background */}
              <div className="icon-circle">
                <i className={d.icon} style={{ color: "#fff", fontSize: "32px" }}></i>
              </div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
