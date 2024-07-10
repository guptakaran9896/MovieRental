import React, { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "../../components/Common/Modal";
import MovieDescription from "./MovieDescription";
import { doGET } from "../../store/util/httpUtil";
import { ENDPOINTS } from "../../utils/Constants";

const CardContainer = (props) => {
  const [modal, setModal] = useState(false);
  const [movie, setMovie] = useState();
  const [allMovies, setAllMovies] = useState();
  const getData = async () => {
    try {
      const response = await doGET(ENDPOINTS.getmovies);
      console.log(response?.data);
      setAllMovies(response?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const cardsData = [
    {
      id: 1,
      title: "CARD 1",
      content: "Clark Kent",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABY_rBwlPDEznIL4MMygT4B6rMN6Snup4wUu3suDV1yjSi12EvH8whZ2XSlA2SGo17Gygf-nUrNz__YId3169Bb9ypEnSWMePQaIqnGFAni_bAuKJse1mGowtCaMO.jpg?r=cae",
    },
    {
      id: 2,
      title: "CARD 2",
      content: "Bruce Wayne",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABeAMbUJJlktp6w8UpYSHW8cJHkEeNS76gQw5ThMDuqn8QdmYH4ATHCfoJmgy9x3VBh6ZPa9h8Mit7PyyZifGP8bmBPd5LIr-WizyVYqIVPEaGKc7XP-LQ7wfgZar.jpg?r=62e",
    },
    {
      id: 3,
      title: "CARD 3",
      content: "Peter Parker",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABWN2gs7Ph0YCvz-pvnA2gio0pwYOM3T3jJ8xt3lPF7UsPpobqUexfddqZVp40Cu_Xy27q1liBPHrdIKGmy9p16Uf4C-n9aq5nnRU7licS5JjC2UXUCLG-RTezxqC.jpg?r=373",
    },
    {
      id: 4,
      title: "CARD 4",
      content: "Tony Stark",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcbLWC0gy1moBXv7IxKGKGXyeBaVseHsOTlXzcNuaQDyZoBMIIWvP-exFEFwC_KpvkDKD3tuM_MI8g7JrkjeghAw38Kmh5ZYCB148RSm2GuxKt_dqyKGrsr_TpcNK7ty1QqYGBOFuastaOgj3co-YDV8bmhVDA.jpg?r=77b",
    },
    {
      id: 5,
      title: "CARD 5",
      content: "Reed Richards",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSQRzNZw0sdhfp2nmORP8obVtvyqoQr-xGumXiDcM5b6s_9D9WtWQojIUpORJIUvj-YsrVjKC_5PIuYMPSZIL_Ir1VUqKxeHnPr-YdCHSVAuagAOTRUFF9oyBGI-.jpg?r=b4e",
    },
    {
      id: 6,
      title: "CARD 6",
      content: "Wade Wilson",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABdncnmk-gRk1M89pVISTDl0MpIsgKBk2swizl7pASTBUZeroQmElfVH8lrTQqLLd40FMdy2BnUv-34b5u_zybHpwASc7uYM6hrCBrGx5o5TglIp54_ln_8-x0JOq.jpg?r=93f",
    },
    {
      id: 7,
      title: "CARD 7",
      content: "Peter Quill",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcjXrijrsz8dH_rPZqm4DQW8SHd5hj8PadoJdIhRQXygf6im-orK_0PXkie6l-7pjsLBx7z0rdHLwXCIyd6qfqmx5nDLZ3XRNFslpT0AGw2u3YO3POVzyx6kQlaS.jpg?r=dea",
    },
    {
      id: 8,
      title: "CARD 8",
      content: "Steven Rogers",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcjXrijrsz8dH_rPZqm4DQW8SHd5hj8PadoJdIhRQXygf6im-orK_0PXkie6l-7pjsLBx7z0rdHLwXCIyd6qfqmx5nDLZ3XRNFslpT0AGw2u3YO3POVzyx6kQlaS.jpg?r=dea",
    },
    {
      id: 9,
      title: "CARD 9",
      content: "Bruce Banner",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcjXrijrsz8dH_rPZqm4DQW8SHd5hj8PadoJdIhRQXygf6im-orK_0PXkie6l-7pjsLBx7z0rdHLwXCIyd6qfqmx5nDLZ3XRNFslpT0AGw2u3YO3POVzyx6kQlaS.jpg?r=dea",
    },
    {
      id: 10,
      title: "CARD 10",
      content: "Vincent Strange",
      imgUrl:
        "https://occ-0-4744-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcjXrijrsz8dH_rPZqm4DQW8SHd5hj8PadoJdIhRQXygf6im-orK_0PXkie6l-7pjsLBx7z0rdHLwXCIyd6qfqmx5nDLZ3XRNFslpT0AGw2u3YO3POVzyx6kQlaS.jpg?r=dea",
    },
  ];
  return (
    <div className="cards-movie-container">
      {allMovies?.map((card) => (
        <Card
          title={card.title}
          onClick={() => {
            setModal(true);
            setMovie(card);
          }}
          content={card.description}
          imgUrl={card.image_path}
        />
      ))}
      {modal ? (
        <Modal
          onChange={() => setModal(false)}
          className="col-sm-5"
          style={{
            backgroundColor: "transparent",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <MovieDescription movie={movie} />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardContainer;
