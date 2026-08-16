export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/study/definitionSheet',
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}
