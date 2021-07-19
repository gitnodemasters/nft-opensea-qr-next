import { memo, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import ContainedButton from "components/UI/Buttons/ContainedButton";
import QRNFTDialog from "parts/QRNFTDialog";
import InformationContent from "./InformationContent";
import usePopUp from "utils/hooks/usePopUp";
import MESSAGES from "utils/constants/messages";
import LINKS from "utils/constants/links";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  delete: {
    backgroundColor: theme.custom.palette.red,
  },
}));

const NFTInformation = ({ good, assetInfo }) => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();

  // const { accountRS } = useSelector((state) => state.auth);
  const [openQRModal, setOpenQRModal] = useState(false);

  const qrHandler = useCallback(() => {    

    setOpenQRModal(true);
  }, [router, setPopUp, setOpenQRModal]);

  return (
    <div className={classes.root}>
      <InformationContent good={good} assetInfo={assetInfo} />

      <ContainedButton onClick={qrHandler}>Generate QR Code</ContainedButton>

      {openQRModal && (
        <QRNFTDialog
          open={openQRModal}
          setOpen={setOpenQRModal}
          item={good}
        />
      )}
    </div>
  );
};

export default memo(NFTInformation);
