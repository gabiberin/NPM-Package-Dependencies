import {
  RequestHandler
} from 'express';
import {
  Tree
} from '../../data-structures/Tree';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
export const getPackage: RequestHandler = async function (req, res, next) {
  const {
    name,
    version
  } = req.params;

  try {

    const tree = await Tree.buildTree(name, version);

    return res.status(200).json(tree.printTree());

  } catch (error) {
    return res.status(400).send('Error: Invalid package or version');
  }
};