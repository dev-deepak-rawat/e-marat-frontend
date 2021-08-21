import styled from 'styled-components';
import tw from 'twin.macro';
import { Col } from 'antd';
import { GithubFilled, LinkedinFilled, TwitterOutlined } from '@ant-design/icons';

export type PropsType = {
	name: string,
	img: string,
	github: string
	linkedin: string
	twitter: string
};

export default function TeamMember({ name, img, github, linkedin, twitter }: PropsType) {
	return (
		<Col lg={6} md={8} sm={12} xs={16} className="shadow-around mb-8 lg:mb-0 mx-4">
			<div className="overflow-hidden">
				<img src={img} alt="haris" className="transform transition duration-500 hover:scale-125" />
			</div>
			<div className="text-center py-3">
				<Name>{name}</Name>
				<p>Full Stack Developer</p>
				<div className="flex justify-center text-xl">
					<a href={github} className="pr-3">
						<GithubFilled  className="text-gray-600 hover:text-black" />
					</a>
					<a href={linkedin} className="pr-3">
						<LinkedinFilled className="text-gray-600 hover:text-brands-linkedin" />
					</a>
					<a href={twitter} className="pr-3">
						<TwitterOutlined className="text-gray-600 hover:text-brands-twitter" />
					</a>
				</div>
			</div>
		</Col>
	)
}
 
const Name = styled.h6`
    ${tw`
        text-2xl font-semibold uppercase
    `};
`;