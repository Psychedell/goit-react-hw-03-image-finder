import ContentLoader from 'react-content-loader';

// const MyLoader = props => (
//   <ContentLoader
//     speed={0.3}
//     width={400}
//     height={200}
//     viewBox="0 0 400 200"
//     backgroundColor="#fafafa"
//     foregroundColor="#d4daff"
//     {...props}
//   >
//     <rect x="10" y="3" rx="0" ry="0" width="73" height="53" />
//     <rect x="56" y="38" rx="0" ry="0" width="0" height="1" />
//     <rect x="93" y="73" rx="0" ry="0" width="73" height="53" />
//     <rect x="181" y="73" rx="0" ry="0" width="73" height="53" />
//     <rect x="269" y="72" rx="0" ry="0" width="73" height="53" />
//     <rect x="95" y="3" rx="0" ry="0" width="73" height="53" />
//     <rect x="182" y="3" rx="0" ry="0" width="73" height="53" />
//     <rect x="268" y="3" rx="0" ry="0" width="73" height="53" />
//     <rect x="9" y="73" rx="0" ry="0" width="73" height="53" />
//     <rect x="10" y="141" rx="0" ry="0" width="73" height="53" />
//     <rect x="94" y="141" rx="0" ry="0" width="73" height="53" />
//     <rect x="181" y="140" rx="0" ry="0" width="73" height="53" />
//     <rect x="268" y="141" rx="0" ry="0" width="73" height="53" />
//   </ContentLoader>
// );

const MyLoader = props => (
  <ContentLoader
    speed={0.4}
    width={400}
    height={280}
    viewBox="0 0 400 280"
    backgroundColor="#fafafa"
    foregroundColor="#3f51b5"
    {...props}
  >
    <rect x="9" y="3" rx="0" ry="0" width="360" height="260" />
    <rect x="56" y="38" rx="0" ry="0" width="0" height="1" />
  </ContentLoader>
);

// const ThreeDots = props => (
//   <ContentLoader
//     viewBox="0 0 400 160"
//     height={160}
//     width={400}
//     backgroundColor="#fafafa"
//     foregroundColor="#d4daff"
//     {...props}
//   >
//     <circle cx="150" cy="86" r="8" />
//     <circle cx="194" cy="86" r="8" />
//     <circle cx="238" cy="86" r="8" />
//   </ContentLoader>
// );
// export default ThreeDots;

export default MyLoader;
