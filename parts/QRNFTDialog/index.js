import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MagicDialog from "components/MagicDialog";
import ProductContent from "parts/ProductContent";
import usePopUp from "utils/hooks/usePopUp";
import { QRCode } from "react-qr-svg";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  image: {
    height: 300,
    width: 300,
    maxWidth: "100%",
    objectFit: "contain",
    borderRadius: 16,
    border: `2px solid ${theme.custom.palette.border}`,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: theme.spacing(2, 0),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  accountName: {
    fontSize: 14,
    lineBreak: 'anywhere',
  },
  qrContainer: {
    display: "flex",
  },
  container: {
    marginLeft: theme.spacing(5),
    width: '60%'
  },
}));

const QRNFTDialog = ({ open, setOpen, item }) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog open={open} title="QR-CODE" onClose={handleClose}>
      <div className={classes.qrContainer}>
        <div className={classes.imageContainer}>
          {/* <ProductContent info={item} className={classes.image} /> */}
            {/* prop	type	default value
            value	string	
            size	number	256
            bgColor	string	'#FFFFFF'
            fgColor	string	'#000000'
            level	string ('L' 'M' 'Q' 'H')	'L' */}
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 256 }}
            value={item.address + item.token_id + item.creator_address + item.creator_name.username + item.created_date}
            className={classes.image}
          />
        </div>
        <div className={classes.container}>
          <Typography variant="h5" color="textPrimary" className={classes.name}>
            QR Code Parameters
          </Typography>
          <Typography color="textPrimary" className={classes.label}>
            Token Infos
          </Typography>
          <Typography color="primary" className={classes.accountName}>
            {`CONTRACT ADDRESS: ${item.address}`}
          </Typography>
          <Typography color="primary" className={classes.accountName}>
            {`TOKEN ID: ${item.token_id}`}
          </Typography>
          <Typography color="textPrimary" className={classes.label}>
            Creator Info
          </Typography>
          <Typography color="primary" className={classes.accountName}>
            {`CREATOR ADDRESS: ${item.creator_address}`}
          </Typography>
          <Typography color="primary" className={classes.accountName}>
            {`NAME: ${item.creator_name.username}`}
          </Typography>
          <Typography color="primary" className={classes.accountName}>
            {`CREATED DATE: ${item.created_date}`}
          </Typography>
        </div>
      </div>
    </MagicDialog>
  );
};

export default memo(QRNFTDialog);
