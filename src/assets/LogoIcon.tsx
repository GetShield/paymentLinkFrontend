interface Props extends React.SVGProps<SVGSVGElement> {}

const SvgComponent: React.FC<Props> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={46}
    height={48}
    fill='none'
    {...props}
  >
    <path fill='url(#a)' d='M0 0h46v48H0z' />
    <defs>
      <pattern
        id='a'
        width={1}
        height={1}
        patternContentUnits='objectBoundingBox'
      >
        <use xlinkHref='#b' transform='matrix(.01154 0 0 .01106 -.125 -.125)' />
      </pattern>
      <image
        xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAABxCAMAAADroISFAAADAFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8hisj///////////8op+v///////////////8hiscnoOP///////////8ijMv///////////////8jktMijc0ii8n///////////////////////////8ijMv///////////////////////8hicYijcsijcsijs0kmNohiscij84jltf///////////////////////////////////8mouj////////////////////////////l//8ikdEjkdIhi8gkl9kjk9Qmn+QlneIhjcshicUqtfX///////////////////////////////////////////8hi8kkmNww0/////////////////////////8jkdIjltghicUij80jlNUhjMohisgikM8hjMkikdH///847f////////////////////////////////////////////////////////////8jkNAhi8n///////////////8iisgikNEhisgijcwjkM8jk9QhicYhiccijs4hi8kjldj///////////8nqO8hh8Ukmdv///8ij87///////////////////////8hi8ghh8Qijcwijcskltf///8hicYjkM0ghb////8gh8P///8gg70ij84kmNoijcwijcsii8n///8hh8MhiMQWgsEhiMUhicUahMIYg8Fhq9UchcIhh8T////3+/0ehsJFnM0hh8IghsMtj8dap9P5+/14t9tSo9Hm8fg2lMoUgcCOw+Go0OiGv9/D3++DvN1xs9ogh8NNn8/U6PS82u3H4vE/mMzv9vpssNfo8vjd7fbq9Pr0+fwpjcbi7/ex1Omv1OmcyeSayeR/u93n8fhortaDu93l8PfocXfCAAAAynRSTlMAsllyY55OYIq0ptYClArMCdSdhxRQYZjnXAO3mwviIvLu6boeUQv4D/r97A40G7jJQozgoD2Y3cNFMmvZSxPQwKuQ9ebS8KqciiH3gUiu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'
        id='b'
        width={384}
        height={113}
      />
    </defs>
  </svg>
);
export default SvgComponent;
