import {Layout, Typography} from "antd";
import {Link} from "react-router-dom";

const {Header} = Layout;

function Navbar() {
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: "black"
                }}
            >
                <Typography.Title style={{color:"white"}}>
                    <Link to={"/"}>
                        Header
                    </Link>
                </Typography.Title>
            </Header>
        </Layout>
    );
}
export default Navbar;