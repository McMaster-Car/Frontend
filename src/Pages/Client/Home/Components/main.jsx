import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Grid } from '@mui/material';
import Products from '../Products';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../store/products/productsSlice';
import Filter from './filter';

const drawerWidth = 240;

export default function MainComponent({ categories }) {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [lastChild, setLastChild] = React.useState(false);
  const [notParent, setNotParent] = React.useState(false);
  const [uniqueAttributes, setUniqueAttributes] = React.useState([]);

  const productsResponse = useSelector(selectProducts);

  const topCategories = React.useMemo(() => categories.filter((category) => !category.parentCategory), [categories]);

  React.useEffect(() => {
    if (categoryId) {
      const foundCategory = categories.find((category) => category._id === categoryId);
      setSelectedCategory(foundCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryId, categories]);

  React.useEffect(() => {
    if (categoryId) {
      const categoryExists = topCategories.some(category => category._id === categoryId);

      if (categoryExists) {
        // console.log('Category exists');
        setNotParent(false);
      } else {
        if (productsResponse.products && productsResponse.products.length > 0) {
          const filtered = productsResponse.products.filter(product =>
            product.categories.some(category =>
              category._id === categoryId || category.parentCategory === categoryId
            )
          );

          const attributesMap = {};

          filtered.forEach(product => {
            product.variation.attributes.forEach(attribute => {
              if (!attributesMap[attribute.attributeId]) {
                attributesMap[attribute.attributeId] = {
                  id: attribute.attributeId,
                  name: attribute.attributeName,
                  values: new Set(),
                };
              }
              attributesMap[attribute.attributeId].values.add(attribute.value.trim());
            });
          });

          const uniqueAttributesArray = Object.values(attributesMap).map(attribute => ({
            id: attribute.id,
            name: attribute.name,
            values: Array.from(attribute.values),
          }));

          // console.log(uniqueAttributesArray);
          setUniqueAttributes(uniqueAttributesArray);
        } else {
          // console.log("Products Not Found");
        }
        setNotParent(true);
        // console.log('Category does not exist');
      }
    }
  }, [categoryId, topCategories, productsResponse.products]);

  React.useEffect(() => {
    if (selectedCategory) {
      const subCategories = categories.filter((subCategory) => subCategory.parentCategory && subCategory.parentCategory._id === selectedCategory._id);
      setLastChild(subCategories.length === 0);
    }
  }, [selectedCategory, categories]);

  const handleCategoryClick = (category) => {
    navigate(`/${category._id}`);
  };

  const renderCategories = (category) => {
    const subCategories = categories.filter((subCategory) => subCategory.parentCategory && subCategory.parentCategory._id === category._id);

    return (
      <div key={category._id} style={{ marginLeft: '20px' }}>
        <Typography variant="h5"
          sx={{
            fontWeight: 'bold',
            textDecoration: subCategories.length === 0 ? 'none' : 'underline',
            color: subCategories.length === 0 ? 'green' : 'inherit'
          }}
        >
          {category.name}
        </Typography>
        {subCategories.length > 0 ? (
          <Grid container>
            {subCategories.map((subCategory) => (
              <Grid key={subCategory._id}
                sx={{
                  my: 1
                }}
                item
                xs={2}
              >
                <Button onClick={() => handleCategoryClick(subCategory)}>
                  <Typography
                    sx={{
                      color: subCategory.length === 0 ? 'green' : 'inherit',
                      fontSize: '12px'
                    }} >
                    {subCategory.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Products categoryId={category._id} />
          </>
        )}
      </div>
    );
  };

  const renderTopCategories = () => {
    return topCategories.map((category) => {
      const children = categories.filter((subCategory) => subCategory.parentCategory && subCategory.parentCategory._id === category._id);
      return (
        <Box key={category._id}
          sx={{
            my: 2
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            {category.name}
          </Typography>
          {children.length > 0 && (
            <Grid container>
              {children.map((child) => (
                <Grid sx={{ my: 1 }} key={child._id} item xs={2}>
                  <Button onClick={() => handleCategoryClick(child)}>
                    <Typography sx={{
                      color: children.length === 0 ? 'green' : 'inherit',
                      fontSize: '12px'
                    }} >
                      {child.name}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      );
    });
  };

  const renderSelectedCategory = () => {
    if (!selectedCategory) return null;

    return renderCategories(selectedCategory);
  };

  const [selectedFilters, setSelectedFilters] = React.useState({});

   
    const handleFilterChange = (filters) => {
      console.log(filters);
      if(filters == {}){
        console.log("No more filters Applied");
      }
      else{
        console.log("Filter/s applied");
        // Cant understand some times it shows categories and some times it shows products
        // on mcmaster car 
        // will recheck 
      }
        setSelectedFilters(filters);
    };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography textAlign="center"
          sx={{
            my: 2,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#178582'
          }}
        >
          BMI SUPPLY
        </Typography>
        <Divider />
        <List>
          {notParent ? (
            <Filter
              uniqueAttributes={uniqueAttributes}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          ) : (
            <>
              {topCategories.map((category) => (
                <ListItem key={category._id} disablePadding>
                  <ListItemButton onClick={() => handleCategoryClick(category)}>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {selectedCategory ? renderSelectedCategory() : renderTopCategories()}
      </Box>
    </Box>
  );
}
