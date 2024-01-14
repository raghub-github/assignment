import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/ProductContext";
import { useUserContext } from './context/user_context';
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatePrice";
import AddToCart from "./components/AddToCart";

const API = `${process.env.REACT_APP_HOSTNAME}/api/products`;

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
  const { user } = useUserContext();

  const { _id } = useParams();

  useEffect(() => {
    getSingleProduct(`${API}?_id=${_id}`);
    //eslint-disable-next-line
  }, []);

  if (isSingleLoading) {
    return <div className="page_loading App">Loading.....</div>;
  }

  return (
    <Wrapper>
      {singleProduct.map((elm, index) => {
        return <div key={index}>
          <PageNavigation title={elm.name} />
          <Container className="container">
            <div className="grid grid-two-column">
              {/* product Images  */}
              <div className="product_images">
                <MyImage imgs={elm.image} />
              </div>

              {/* product data  */}
              <div className="product-data">
                <h2>{elm.name}</h2>

                <p className="product-data-price">
                  MRP:
                  <del>
                    <FormatPrice price={elm.price + 250000} />
                  </del>
                </p>
                <p className="product-data-price product-data-real-price">
                  Deal of the Day: <FormatPrice price={elm.price} />
                </p>
                <p>{elm.description}</p>
                <div className="product-data-info">
                  <p>
                    Available:
                    <span style={{ color: "green" }}> {elm.stock > 0 ? "In Stock" : "Not Available"}</span>
                  </p>
                </div>
                <hr />
                {!user.isAdmin ? ((elm.stock) > 0 && <AddToCart product={elm} />) : ""}
                {/* {(elm.stock) > 0 && <AddToCart product={elm} />} */}
              </div>
            </div>
          </Container>
        </div>
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 2rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;