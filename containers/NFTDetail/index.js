import { memo, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import * as openseaAPI from "services/api-opensea";

import NoData from "parts/NoData";
import ImageWall from "parts/ImageWall";
import ProductContent from "parts/ProductContent";
import NFTInformation from "./NFTInformation";
import AssetBids from './AssetBids'
import usePopUp from "utils/hooks/usePopUp";
import MESSAGES from "utils/constants/messages";
import { isEmpty } from "utils/helpers/utility";
import getJSONParse from "utils/helpers/getJSONParse";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: theme.custom.layout.maxDesktopWidth,
    marginBottom: theme.spacing(5),
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1),
  },
  image: {
    height: 480,
    maxWidth: "100%",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      height: 350,
    },
  },
}));

const NFTDetail = () => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();

  const [good, setGood] = useState({});
  const assetInfo = useMemo(() => getJSONParse(good.asset_contract), [good]);

  useEffect(() => {
    const [contract_address, token_id] = router.query.goods.split("-");

    const getAssetInfo = async () => {
      const params = {
        contract_address: contract_address,
        token_id: token_id,
      };
      let response = await openseaAPI.getSingleAsset(params);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR });
        return;
      }

      const {
        name,
        description,
        asset_contract,
        creator,
        image_url,
        external_link,
        permalink,
      } = response;
      let info = {
        ...asset_contract,
        creator_address: creator.address,
        creator_name: creator.user,
        name: name,
        token_id: token_id,
        description: description,
        image_url: image_url,
        external_link: external_link,
        permalink: permalink,
      };

      setGood(info);
    };

    if (router.query.goods) {
      getAssetInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <main className={classes.root}>
      <ImageWall header="NFT Details" />
      {isEmpty(good) ? (
        <NoData />
      ) : (
        <>
          <Grid container spacing={5} className={classes.container}>
            <Grid item xs={12} sm={6} md={5}>
              <a href={good.image_url} target="_blank" rel="noreferrer">
                <div className={classes.imageContainer}>
                  <ProductContent info={good} className={classes.image} />
                </div>
              </a>
              <Typography color="textSecondary">
                Click on the image to open the original file
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <NFTInformation good={good} assetInfo={assetInfo} />
              <AssetBids
                good={good}
              />
            </Grid>
          </Grid>
        </>
      )}
    </main>
  );
};

export default memo(NFTDetail);
