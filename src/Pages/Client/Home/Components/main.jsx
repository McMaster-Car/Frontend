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
import { Backdrop, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid } from '@mui/material';
import Products from '../Products';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../store/products/productsSlice';
import Filter from './filter';
import ProductList from "../Products/ProductList"

const drawerWidth = 240;

export default function MainComponent({ categories }) {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [lastChild, setLastChild] = React.useState(false);
  const [notParent, setNotParent] = React.useState(false);
  const [uniqueAttributes, setUniqueAttributes] = React.useState([]);
  const [selectedFilters, setSelectedFilters] = React.useState({});
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const productsResponse = useSelector(selectProducts);

  const topCategories = React.useMemo(() => categories.filter((category) => !category.parentCategory), [categories]);

  const getAttrbutes = (filtered) => {
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

    return uniqueAttributesArray;
  };

  const transformData = (inputData) => {
    return Object.keys(inputData).map(key => ({
      attributeId: key,
      value: inputData[key]
    }));
  };


  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {

    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }, [])

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
        setNotParent(false);
      } else {
        if (productsResponse.products && productsResponse.products.length > 0) {
          const filtered = productsResponse.products.filter(product =>
            product.categories.some(category =>
              category._id === categoryId || category.parentCategory === categoryId
            )
          );

          const filters = localStorage.getItem("filters");
          if (filters) {
            const filtersData = transformData(JSON.parse(filters));
            setSelectedFilters(JSON.parse(filters));

            const filteredProducts = filtered.filter(product => {
              return filtersData.every(filter => {
                return product.variation.attributes.some(attribute => {
                  return attribute.attributeId === filter.attributeId && attribute.value.trim() === filter.value.trim();
                });
              });
            });

            const attr = getAttrbutes(filteredProducts);
            setUniqueAttributes(attr);
            setFilteredProducts(filteredProducts);
          } else {
            const attr = getAttrbutes(filtered);
            setUniqueAttributes(attr);
            setFilteredProducts([]);
          }
        } else {
          setFilteredProducts([]);
        }
        setNotParent(true);
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
                  m: 1
                }}
                item
                xs={2}
              >
                {/* <Button onClick={() => handleCategoryClick(subCategory)}>
                  <Typography
                    sx={{
                      color: subCategory.length === 0 ? 'green' : 'inherit',
                      fontSize: '12px'
                    }} >
                    {subCategory.name}
                  </Typography>
                </Button> */}
                <Card>
                  <CardActionArea onClick={() => handleCategoryClick(subCategory)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={subCategory.image}
                      alt={subCategory.name}
                    />
                    <CardContent>
                      <Typography sx={{
                        color: subCategory.length === 0 ? 'green' : 'inherit',
                        fontSize: '12px',
                        textAlign: "center"
                      }}
                        gutterBottom variant="h5" component="div">
                        {subCategory.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Products categoryId={category._id} filteredProducts={filteredProducts} />
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
                <Grid sx={{ m: 1 }} key={child._id} item xs={2}>
                  <Card>
                    <CardActionArea onClick={() => handleCategoryClick(child)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={child.image}
                        alt={child.name}
                      />
                      <CardContent>
                        <Typography sx={{
                          fontSize: '12px',
                          textAlign: "center"
                        }}
                          gutterBottom variant="h5" component="div">
                          {child.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  {/* <Button onClick={() => handleCategoryClick(child)}>
                    <Typography sx={{
                      color: children.length === 0 ? 'green' : 'inherit',
                      fontSize: '12px'
                    }} >
                      {child.name}
                    </Typography>
                  </Button> */}
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

  const handleFilterChange = (filters) => {
    localStorage.setItem("filters", JSON.stringify(filters));
    if (Object.keys(filters).length === 0) {
      const filtered = productsResponse.products.filter(product =>
        product.categories.some(category =>
          category._id === categoryId || category.parentCategory === categoryId
        )
      );

      const attr = getAttrbutes(filtered);
      setUniqueAttributes(attr);
      setFilteredProducts([]);
    } else {
      const filtersData = transformData(filters);

      const filteredProducts = productsResponse.products.filter(product => {
        return filtersData.every(filter => {
          return product.variation.attributes.some(attribute => {
            return attribute.attributeId === filter.attributeId && attribute.value.trim() === filter.value.trim();
          });
        });
      });

      console.log(filteredProducts);
      setFilteredProducts(filteredProducts);
      const attr = getAttrbutes(filteredProducts);
      setUniqueAttributes(attr);
    }
    setSelectedFilters(filters)
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }



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
        <Typography
          textAlign="center"
          sx={{
            my: 2,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#178582',
            cursor: 'pointer',
            '&:hover': {
              color: '#125b61'
            }
          }}
          onClick={() => { window.location.href = '/' }}
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
        {
          Object.keys(selectedFilters).length != 0 ?
            (
              filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} />
              ) : (
                <Typography variant="h6">No products found</Typography>
              )
            )
            :
            (
              <>
                {
                  categoryId ?
                    renderSelectedCategory()
                    :
                    renderTopCategories()}
              </>
            )
        }
      </Box>
    </Box>
  );
}
