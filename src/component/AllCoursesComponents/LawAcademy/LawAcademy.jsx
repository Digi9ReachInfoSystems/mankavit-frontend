import React from 'react';
import {
  Wrapper,
  Heading,
  Subheading,
  HighlightTitle,
  Paragraph,
  List,
  ListItem,
  Highlight
} from './LawAcademy.stylles';
import { getAllStatic } from '../../../api/staticApi';



const LawAcademy = () => {

  const [dynamicContent, setDynamicContent] = React.useState(null);

  React.useEffect(() => {
    const apiCaller = async () => {
      try {
       
        const response = await  getAllStatic();
        console.log("Static content response:", response);
        const fetchedContent = response[0].courseInfo;
        setDynamicContent(fetchedContent);
      } catch (error) {
        console.error("Error fetching dynamic content:", error);
      }
    };

    apiCaller();
  }, []);
  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={dynamicContent?{__html:dynamicContent}:{__html:""}}>

      </div>
      {/* <Heading>
        Course Structure At <Highlight>Mankavit Law Academy</Highlight>
      </Heading>

      <Paragraph>{descriptionText}</Paragraph>

      <HighlightTitle>
        Course <Highlight>Highlights:</Highlight>
      </HighlightTitle>

      <List>
        {highlightsList.map((item, idx) => (
          <ListItem key={idx}>
            <strong>{item.title}</strong> {item.content}
          </ListItem>
        ))}
      </List> */}
    </Wrapper>
  );
};

export default LawAcademy;
