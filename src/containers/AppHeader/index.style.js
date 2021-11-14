import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  separator: {
    display: "flex",
    flex: 1,
  },
  flexDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginRight: '4%',
  },
  versionText: {
    paddingRight: '20px',
    color: '#9A8EE0',
  },
  networkPaper: {
    borderRadius: '4px',
    backgroundColor: '#2FD593',
    color: 'white',
    textTransform: 'uppercase',
  },
  networkText: {
    padding: '4px 15px',
  },
  logo: {
    height: 45,
    marginLeft: theme.spacing(8),
    cursor: 'pointer',
  },
  toolbar: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    background: "#5643CC",
  },
  appbar: {
    background: "#5643CC",
  }
}));

export default useStyles;