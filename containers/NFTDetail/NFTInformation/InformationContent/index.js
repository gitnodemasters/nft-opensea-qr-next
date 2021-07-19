import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  description: {
    fontSize: 16,
    marginBottom: theme.spacing(3),
  },
  container: {
    marginBottom: theme.spacing(3),
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountName: {
    fontSize: 14,
  },
  accountDescription: {
    fontSize: 14,
  },
  accountRS: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
  },
}));

const InformationContent = ({ good, assetInfo }) => {
  const classes = useStyles();
  console.log(assetInfo);

  return (
    <>
      <Typography variant="h4" color="textPrimary" className={classes.name}>
        {good.name}
      </Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.description}
      >
        {good.description}
      </Typography>

      <div className={classes.container}>
        <Typography color="textPrimary" className={classes.label}>
          ASSET LINK INFO
        </Typography>
        <a href={good.permalink} target='_blank' rel='noreferrer'>
          <Typography color="primary" className={classes.accountName}>
            {`OPENSEA LINK: ${good.permalink}`}
          </Typography>
        </a>
        <a href={good.external_link} target='_blank' rel='noreferrer'>
          <Typography color="primary" className={classes.accountName}>
          {`RARIBLE LINK: ${good.external_link}`}
          </Typography>
        </a>        
      </div>

      <div className={classes.container}>
        <Typography color="textPrimary" className={classes.label}>
          CONTRACT INFO
        </Typography>
        <Typography color="primary" className={classes.accountName}>
          {`CONTRACT ADDRESS: ${good.address}`}
        </Typography>
        <Typography color="primary" className={classes.accountName}>
          {`CONTRACT TYPE: ${good.asset_contract_type}`}
        </Typography>
      </div>
    </>
  );
};

export default memo(InformationContent);
