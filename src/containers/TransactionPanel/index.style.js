import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    display: 'flex',
  },
  cardHeight: {
    height: '366px',
    boxShadow: '0px 3px 6px #000000',
    position:'relative',
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
  },
  bodyText: {
    color: '#7C7C7D',
    fontSize: '14px',
    fontWeight:'300',
  },
  numberText: {
    color: '#1C2128',
    fontWeight: 500,
  },
  active: {
    color: '#5643CC !important',
    borderBottom: '2px solid #5643CC',
    fontSize: '16px',
  },
  inlineElement: {
    display: 'inline',
    marginRight: '30px',
    fontSize: '18px',
    fontWeight:500,
    color: '#B8B8BA',
    cursor: 'pointer',
  },
  panelFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagText: {
    fontSize: '18px',
    color: '#2FD593',
  },
}));

export default useStyles;