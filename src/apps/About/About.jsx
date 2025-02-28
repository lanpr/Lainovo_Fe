import AboutStyle from "./scss/About.module.scss";
function About() {
  return (
    <div className={AboutStyle.aboutContainer}>
      <div className={AboutStyle.aboutIntroduce}>
        <p>INTRODUCE</p>
        <p>
          We are Group 119, currently working on building a website for selling
          comic books and light novels. The project started in December 2023 and
          ended in May 2024. Our team consists of 5 experienced members. Thanks
          to our hard work, perseverance, and eagerness to learn, we have
          managed to create a website that meets the needs of a comic book and
          light novel sales website to satisfy users. Although our experience is
          still immature, with the spirit of improving the quality of the
          products we make, our team will continue to learn and improve this
          website and future products to provide everyone with the best product.
        </p>
        <div>
          <span>Products and Service</span>
          <div>
            <ul>
              <li>
                Publishing and distributing books and cultural publications.
              </li>
              <li>
                Representing and brokering domestic and international copyrights
                (books, manga, lightnovel, novel).
              </li>
              <li>
                Providing professional services in the publishing field:
                Organizing manuscripts, Editing, Designing, Plate making, Page
                layout, Film output, Printing, Post-printing processing… Please
                let me know if you need further assistance.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span>Mission</span>
          <p>
            Become a quality publishing unit in Vietnam and a trusted partner of
            publishers around the world.
          </p>
        </div>
        <div>
          <span>Core values</span>
          <p>
            Build and develop a sustainable business model on the foundation of
            ensuring the best interests of customers, employees, and
            shareholders.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
