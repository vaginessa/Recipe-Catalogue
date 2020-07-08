import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MealPreview from '../Components/Recipes';
import fetchAllMeals from '../Actions/fetchAll';
import fetchMeal from '../Actions/fetchSingle';
import { getRecipesError, getRecipes, getRecipesPending } from '../Settings/Index';
import { UPDATE_CATEGORY } from '../Actions/index';
import PageLoader from '../Components/Loading';

const RecipeCatalogue = props => {
  const {
    recipes, pending, fetchAllMeals, category,
  } = props;

  useEffect(() => {
    fetchAllMeals(category);
  }, [category, fetchAllMeals]);

  const shouldComponentRender = () => {
    if (category === undefined || pending === true) return false;
    return true;
  };

  if (!shouldComponentRender()) { return <PageLoader />; }
  return (
    <div>
      <div className="container">
        {recipes.map(el => (
          <Link to={`/meal/${el.idMeal}`} key={Math.random() * 1000}>
            <MealPreview
              src={el.strMealThumb}
              name={el.strMeal}
              id={el.idMeal}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

RecipeCatalogue.defaultProps = {
  recipes: [''],
};

RecipeCatalogue.propTypes = {
  pending: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  fetchAllMeals: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(String),
};

const mapStateToProps = state => {
  const { allMeals } = state;
  return (
    {
      error: getRecipesError(allMeals),
      recipes: getRecipes(allMeals),
      pending: getRecipesPending(allMeals),
      current: allMeals.category,
    }
  );
};

const mapDispatchToProps = {
  fetchAllMeals,
  addFilter: UPDATE_CATEGORY,
  fetchMeal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeCatalogue);
